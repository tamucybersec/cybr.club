# The _Official_ Website for Texas A&amp;M Cybersecurity Club

[![Email Header Analyzer Demo](./logo.gif)](https://cybr.club)

[![Discord](https://img.shields.io/discord/631254092332662805?logo=discord)](https://discord.gg/nCpZzbB)
[![Twitter Follow](https://img.shields.io/twitter/follow/tamucybersec?style=social)](https://twitter.com/intent/follow?screen_name=tamucybersec)
[![Instagram Follow](https://img.shields.io/badge/Follow%20@tamucybersec--grey?style=social&logo=instagram)](https://www.instagram.com/tamucybersec/)
[![LinkedIn Follow](https://img.shields.io/badge/Follow%20our%20page--blue?style=social&logo=linkedin)](https://www.linkedin.com/company/texas-a-m-cyber-security-club/about/)

![GitHub](https://img.shields.io/github/license/tamucybersec/cybr.club?color=blue)

# How to Deploy

We use AWS S3 Buckets to host the website. To deploy the latest build of the astro site to the bucket, you must do the following:

1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. [Configure your CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html) using `aws configure` and feed it the credentials from the accessKeys.csv
3. [Deploy the build](https://docs.astro.build/en/guides/deploy/aws/#s3-static-website-hosting) using `aws s3 cp dist/ s3://cybr.club/ --recursive`

**OR**

-   If you've already configured everything and know it works, just run `npm run deploy`

# Archive

- Previously, the website was deployed using [CodePipeline from AWS](https://aws.amazon.com/codepipeline/) 