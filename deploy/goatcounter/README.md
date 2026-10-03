# Self-hosted website analytics

This implements [cybr.club#159](https://github.com/tamucybersec/cybr.club/issues/159) with GoatCounter 2.7.0 and a separate SQLite volume. Deploy this stack explicitly; ordinary website builds do not create or initialize an analytics service. It needs a TLS hostname, persistent Docker storage, and the existing `infra` network.

## First deployment

1. Choose an analytics hostname (for example `analytics.cybr.club`) and point its DNS at the reverse proxy. Install a TLS certificate and adapt `nginx.conf.example` in the infrastructure proxy. Preserve the hostname: GoatCounter selects the site by the HTTP Host header. Do not expose port 8080 directly on the host.
2. From this repository's root, create the database and first user. Replace the example hostname and officer email. The command prompts for the password, keeping it out of shell history:

    ```sh
    docker compose -f deploy/goatcounter/compose.yml run --rm goatcounter db create site -createdb -vhost=analytics.cybr.club -user.email=officer@example.com
    docker compose -f deploy/goatcounter/compose.yml up -d
    ```

3. Sign in to the chosen analytics hostname. Keep site statistics private and public visitor counters disabled. Set the account timezone to **UTC** so daily buckets match the dashboard. Create an API token with **read statistics only** for CyberHam (Settings → API). Do not grant count, export, or site management permissions. Use a dedicated read-only user if possible.
4. In CyberHam's deployment environment (or its host-side `.env`, mode `0600`), set `GOATCOUNTER_URL=https://analytics.cybr.club` and `GOATCOUNTER_API_TOKEN=<statistics token>`, then recreate the CyberHam service. Use the HTTPS virtual host, not `http://goatcounter:8080`, because site selection uses Host. Ensure the container can reach that hostname. Never put this token in the website repository, public build variables, or a browser request.
5. Set the website GitHub Actions repository variable `NEXT_PUBLIC_GOATCOUNTER_URL` to the same HTTPS origin and rebuild/deploy the website. Locally, set it in `.env.local` before starting Next.js. The site is statically exported: changing a runtime container environment variable does not update the tracking URL. Leaving the build variable empty disables tracking.

The workflow passes this public origin as a Docker build argument. The tracker fetches `/count.js` from our GoatCounter host and sends counts to `/count`; no third-party script host is needed. If the proxy uses a CSP, permit the analytics origin in `script-src`, `connect-src`, and `img-src`.

## Campaigns and dashboard

Encode links such as `https://cybr.club/qr?utm_campaign=msc-poster-a&utm_source=msc` in printed QR codes. Give each poster/location a distinct `utm_campaign`; `utm_source` can identify a broader location or channel. Both values must be 1–80 ASCII letters, digits, underscores, or hyphens. GoatCounter creates campaign records automatically.

Public routes `/`, `/about`, `/events`, `/join`, `/partnership`, and `/qr` record page visits, including Next.js client navigation. The QR page records events named `qr-join` and `qr-learn-more` on its two action links. Those events carry the current QR campaign as a `campaign:<slug>` event referrer because GoatCounter 2.7 does not apply query campaigns to events. CyberHam reads the event referral breakdown to attribute those clicks. Campaign attribution is intentionally limited to the tagged page and its clicks; there is no cross-page attribution storage. The tracker removes other query parameters, fragments, and referrer paths. Dashboard, registration, and unknown routes are excluded. It does not send member IDs, registration tickets, or the QR page's displayed device/IP details as event fields.

Officers with committee, admin, or super-admin access can open **Admin → Analytics**. Sponsors cannot access the page or the protected `/analytics` API. The report shows up to 90 days, daily public-page visits, QR visits, the two QR click counts, QR campaign comparisons, and the top ten QR referral sources. Empty, unconfigured, and unavailable states are distinct. Reports are fetched with a bounded timeout, and paginated upstream data is collected before returning totals; excessive reports fail rather than silently undercount.

Counts follow GoatCounter's session-based visitor/event aggregation, not raw click logs or globally unique people. Page totals sum per-page visitor counts, so someone visiting two pages can count twice. These are interest indicators, not membership conversions. Blocked scripts, bots, and local development visits may not be counted. No analytics data is inserted into membership or attendance tables.

## Backups, recovery, and updates

The backup sidecar uses SQLite's online backup API every 24 hours, checks integrity, and retains 30 days in a separate volume. Monitor `docker compose -f deploy/goatcounter/compose.yml logs backup` and alert if the newest snapshot is older than 26 hours. Copy snapshots to the infrastructure's off-host backup storage daily; the local backup volume does not protect against loss of the host. Both volumes contain analytics data and must persist across deploys. Never use `down -v` during maintenance.

Before updating, take and copy out a snapshot:

```sh
docker compose -f deploy/goatcounter/compose.yml run --rm backup python /backup.py --once
mkdir -p analytics-backups
docker compose -f deploy/goatcounter/compose.yml cp backup:/backups/. ./analytics-backups/
```

Store exports outside Git. For recovery, stop both services, retain the damaged volume for investigation, and copy a verified snapshot into a fresh data volume as `/home/goatcounter/goatcounter-data/db.sqlite3`. Set ownership to the `goatcounter` user/group from the pinned image before starting. Use a fresh volume so no stale `-wal` or `-shm` files accompany the restored database. Start GoatCounter, verify login and reports, then start backups and perform a test snapshot. Practice recovery on a separate stack before relying on it.

For upgrades, review upstream release notes, update the pinned image version, take an off-host pre-upgrade snapshot, then pull and recreate. `-automigrate` upgrades the schema. Rollback requires the old image **and** the matching pre-upgrade database snapshot. Rotate the statistics token if exposed and restart CyberHam. Schedule version/security review with normal infrastructure maintenance.

## Local checks

Run `npm run test:analytics` for tracking sanitization/event tests, `python3 deploy/goatcounter/test_backup.py` for SQLite backup/restore checks, and `npm run build` for the static site. The Docker build also runs the tracking tests. CyberHam tests cover permissions, date validation, pagination, empty data, rate limits, and sanitized upstream failures.

## Smoke test

After deployment, open a tagged QR link on the production site with tracking enabled, follow each action once, and wait for GoatCounter to persist counts. Confirm `/qr`, `qr-join`, and `qr-learn-more` in GoatCounter and the admin Analytics report. Check client-side navigation records one new page visit, registration/dashboard routes send no counts, sponsor access is denied, and disconnecting GoatCounter leaves website navigation working while the dashboard shows an unavailable message. Verify a backup can restore the same report in an isolated instance.

References: [GoatCounter API](https://www.goatcounter.com/api.html), [campaigns](https://www.goatcounter.com/help/campaigns), [v2.7.0 source/release](https://github.com/arp242/goatcounter/releases/tag/v2.7.0).
