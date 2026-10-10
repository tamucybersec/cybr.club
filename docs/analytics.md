# Website analytics and QR campaigns

The public website sends privacy-filtered page views and QR button events to our self-hosted GoatCounter instance. Committee/admin users access reports and a shared campaign manager under **Admin → Analytics**.

## Configuration

Deploy the companion CyberHam analytics/campaign endpoints before this website. CyberHam needs a statistics-only `GOATCOUNTER_API_TOKEN` and `GOATCOUNTER_URL` for the HTTPS analytics origin. Its `website_url` must match the public website before printing campaign QR codes.

Set the website GitHub Actions repository variable `NEXT_PUBLIC_GOATCOUNTER_URL` to the analytics HTTPS origin, then rebuild/deploy. The workflow passes it as a Docker build argument. Because the website is statically exported, changing container runtime variables does not change the tracking URL. Omitting the variable disables tracking. The GoatCounter API token must never be included in frontend configuration.

Hosting, nginx, SQLite storage, backups, and recovery belong to [Infrastructure's GoatCounter guide](https://github.com/tamucybersec/Infrastructure/blob/main/goatcounter/README.md). Provision that service separately; building the website does not create it.

## Campaigns and dashboard

The Analytics page includes a shared campaign manager for committee/admin users. Create a name, unique campaign tag, and source; copy the generated link or download a PNG/SVG QR code. The link's origin comes from CyberHam's `website_url`, so verify that setting before printing. Local development links point to localhost and work only on that computer. QR codes are generated in the browser using [qrcode.react](https://github.com/zpao/qrcode.react); no external QR service receives the link.

Saved campaign metadata lives in CyberHam's `outreach_campaigns` table and is included in its full backups/database exports. The table is created additively at startup. Traffic remains in GoatCounter, and campaign creation works even while reporting is unavailable. Tags and sources are normalized to lowercase and fixed after creation. Archive/restore only changes the manager's listing; existing printed codes and traffic reports keep working, and archived tags remain reserved. The report also includes manually tagged campaigns that are not saved in the manager. Saved campaigns first appear in the traffic report after a visit is recorded.

Encode links such as `https://cybr.club/qr?utm_campaign=msc-poster-a&utm_source=msc` in printed QR codes. Give each poster/location a distinct `utm_campaign`; `utm_source` can identify a broader location or channel. Both values must be 1–80 ASCII letters, digits, underscores, or hyphens. GoatCounter creates campaign records automatically.

Public routes `/`, `/about`, `/events`, `/join`, `/partnership`, and `/qr` record page visits, including Next.js client navigation. The QR page records events named `qr-join` and `qr-learn-more` on its two action links. Those events carry the current QR campaign as a `campaign/<slug>` event referrer because GoatCounter 2.7 does not apply query campaigns to events. CyberHam reads the event referral breakdown to attribute those clicks. Campaign attribution is intentionally limited to the tagged page and its clicks; there is no cross-page attribution storage. The tracker removes other query parameters, fragments, and referrer paths. Dashboard, registration, and unknown routes are excluded. It does not send member IDs, registration tickets, or the QR page's displayed device/IP details as event fields.

Officers with committee, admin, or super-admin access can open **Admin → Analytics**. Sponsors cannot access the page or the protected `/analytics` API. The report shows up to 90 days, daily public-page visits, QR visits, the two QR click counts, QR campaign comparisons, and the top ten QR referral sources. Empty, unconfigured, and unavailable states are distinct. Reports are fetched with a bounded timeout, and paginated upstream data is collected before returning totals; excessive reports fail rather than silently undercount.

Counts follow GoatCounter's session-based visitor/event aggregation, not raw click logs or globally unique people. Page totals sum per-page visitor counts, so someone visiting two pages can count twice. These are interest indicators, not membership conversions. Blocked scripts, bots, and local development visits may not be counted. No analytics data is inserted into membership or attendance tables.

## Local checks

For interactive testing on localhost, set `NEXT_PUBLIC_GOATCOUNTER_URL` to your local GoatCounter origin and `NEXT_PUBLIC_GOATCOUNTER_ALLOW_LOCAL=true` in `.env.local`, then restart `npm run dev`. GoatCounter otherwise ignores localhost visits. This opt-in only applies to the development server; production builds keep local-visit filtering enabled. CyberHam must use the same origin in `GOATCOUNTER_URL` and a statistics-only `GOATCOUNTER_API_TOKEN`. Allow a few seconds for counts to persist, then reload the Analytics report.

Run `npm run test:analytics` for tracking sanitization/event tests, and `npm run build` for the static site. CI runs the full frontend test suite before building the image. CyberHam tests cover permissions, date validation, pagination, empty data, rate limits, and sanitized upstream failures.
