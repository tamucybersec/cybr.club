# cybr.club

cybr.club is a collection of two important services used by the Texas A&M Cybersecurity Club: a website which displays information about the club and a dashboard for sponsors and officers. Although they have different purposes and style, they use the same technology stack and are deployed to the same location so they are both included in this repository for developer convenience.

# Initial Setup

## Download the Code

- Clone the code from the repository

```bash
git clone https://github.com/tamucybersec/cybr.club.git
cd cybr.club
```

> The repository may take a while to download due to the images included.

## Setup the Environment

- Regardless of your system, you'll need to install both nodejs and npm

### Windows

- Follow the [steps on the website](https://nodejs.org/en/download) on how to download nodejs
    - npm should be included in this installation
    - You may need to add the path to your environment variables or restart your computer

### Unix / WSL

- Use your package manager to install nodejs
    - You may need to install npm as a separate package

## Running the Application

- Run the following commands and open [http://localhost:3000](http://localhost:3000) in your web browser of choice

```bash
npm install # install all dependencies
npm run dev # run the dev server
```

### Dashboard

- If you're just developing the website, you can ignore these steps
- In order to access the dashboard pages, complete the following:
    - Follow the README for CyberHam and successfully run it
    - Add at least one entry to the cyberham.db tokens table
    - Add mock data to the database (use AI) (optional but recommended)

### Content Manager

After logging into the dashboard, select **Website → Content Manager** to open
Sveltia at `/dashboard/content`. All dashboard users can open the editor; GitHub
authentication and repository permissions control content edits separately.

The iframe loads `/dashboard/content/editor`, which uses the same dashboard login
gate and loads Sveltia only after authentication. There is no
standalone `/admin/index.html` entry point. This is a browser-side access gate,
not server-side protection of the editor code or its configuration. Generated
configs remain public at `/admin/config.yml` and, during development or test-target
builds, `/admin/config.local.yml`. `npm run dev` generates both configs;
production-target builds generate only `config.yml` and remove any leftover
`config.local.yml` before exporting the site. To generate both manually, run
`npm run generate:cms -- --development`.
Localhost and loopback IPs use the test content repository and test auth Worker;
other hostnames use the production repository and production auth Worker.

To override this selection, set `NEXT_PUBLIC_CMS_TARGET` in `.env.local`:

```dotenv
# Use production content and authentication, including on localhost.
NEXT_PUBLIC_CMS_TARGET=production
```

Set it to `test` to use the test repository on any hostname, or remove it to
restore hostname-based selection. Restart `npm run dev` after changing it.
For deployed previews, set the variable in the hosting environment before
building; Next.js embeds public environment variables at build time.
Production mode writes to `tamucybersec/Site-Content`, even when running locally.
Both CMS targets automatically follow their repository's default branch, whether
it is named `main` or `master`; no branch name is hardcoded in the CMS configs.

For local sign-in with the production Worker, include the local hostname
(`localhost`, `127.0.0.1`, or `[::1]`, without a port) and `cms.netlify.com` in
that Worker's `ALLOWED_DOMAINS`, alongside `cybr.club,www.cybr.club`. Sveltia
uses `cms.netlify.com` as its default OAuth site identifier on localhost.
Keep the GitHub App callback URL set to the production Worker URL followed by
`/callback`; it does not change when testing locally.

### Content Sync Access Tokens

The website downloads JSON and images before development starts or a build runs.
This uses read-only GitHub tokens, separate from the CMS OAuth credentials.
Set these in `.env.local` (never prefix tokens with `NEXT_PUBLIC_`):

```dotenv
NEXT_PUBLIC_CMS_TARGET=test
CMS_LOCAL_REPO=your-account/Test-Site-Content
CMS_LOCAL_BASE_URL=https://your-test-auth.workers.dev
GITHUB_TOKEN_LOCAL=your_test_repo_read_token
GITHUB_TOKEN_PROD=your_production_repo_read_token
```

`test` selects `CMS_LOCAL_REPO` with `GITHUB_TOKEN_LOCAL`; its CMS authentication
endpoint is `CMS_LOCAL_BASE_URL`. Both CMS variables are required when generating
the test config, and are loaded from `.env.local` (or the build environment).
Changing them regenerates the config automatically. These values are included in
the generated public YAML; they are settings, not secrets.
`production` selects `tamucybersec/Site-Content` with `GITHUB_TOKEN_PROD`.
The selected repository is used for both JSON and images, following its default
branch. Only the selected token is required; the other token is never used as a
fallback. The old `GITHUB_TOKEN` and `PRIVATE_REPO_URL` settings are no longer used.

Without `NEXT_PUBLIC_CMS_TARGET`, `npm run dev` syncs test content, while
`npm run build` and `npm run sync:data` sync production content. To manually sync
with development defaults, run `npm run sync:data -- --development`. Set the
target explicitly to keep the editor and downloaded content aligned when testing
production on localhost or using a test preview deployment.

Restart the dev server or run `npm run sync:data` after changing the target or
tokens. Missing tokens or download failures keep existing local files; check the
terminal's target and sync messages to confirm fresh content was downloaded.
These tokens must also be available during production builds. The current Docker
build excludes `.env` files and does not yet pass tokens via build secrets;
setting them only in the running nginx container will not update the built site.

## Formatting and Linting

This project uses prettier and eslint. To enforce these standards, Husky is used.

If you want to format or lint your files outside of during commits, use the following commands:

```bash
npm run format
npm run lint
```

### Husky

Essentially, Husky allows for an easy way to run commands with Git's hooks system. In practice, this means that the formatter and linter are set up to run when you attempt to commit (pre-commit).

### Pre-Commit

When you attempt to commit, the commands in .husky/pre-commit will be run. If git commit fails (whether in your editor of choice or by command line), then it means that one of these processes has failed and needs your attention. For the formatter, it will automatically format your files, so it will require no attention on your end. However, with the linter, it will diagnose several errors. Fix them, turn off the rule in the .eslintrc if you believe it is not useful, or add an eslint-disable comment to ignore the error if this is a special case. Once you fix the errors, you should be able to successfully commit your changes.
