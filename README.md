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
