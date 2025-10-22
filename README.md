# Getting Started

```bash
npm install # to install all dependencies
npm run dev # to run the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result :)

# Formatting and Linting

This project uses prettier and eslint. To enforce these standards, Husky is also used.

## Husky

Essentially, Husky allows for an easy way to run commands with Git's hooks system. In practice, this means that the formatter and linter are set up to run when you attempt to commit (pre-commit).

## Pre-Commit

When you attempt to commit, the commands in .husky/pre-commit will be run. If git commit fails (whether in your editor of choice or by command line), then it means that one of these processes has failed and needs your attention. For the formatter, it will automatically format your files, so it will require no attention on your end. However, with the linter, it will diagnose several errors. Fix them, turn off the rule in the .eslintrc if you believe it is not useful, or add an eslint-disable comment to ignore the error if this is a special case. Once you fix the errors, you should be able to successfully commit your changes.
