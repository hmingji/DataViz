# Blood Donation Trend

Built with nextjs(frontend) and aspnet (api), an interactive visualization of blood donation trend in Malaysia. Data source: [MoH Public Data Repo](https://github.com/MoH-Malaysia/data-darah-public)

## Getting Started (development)

- Install [docker-desktop](https://docs.docker.com/desktop/install/windows-install/)
- Clone repo
- Generate github [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to access the data source repo
- Navigate into folder api, open file appsettings.sample.json and insert the token, then rename the file as: appsettings.Development.json
- Navigate into folder client, rename file .env.sample into .env.local
- Open terminal, run `docker-compose up -d`

You should be good to go now! Open localhost:3000 in browser.

(Note: One of the packages used in api, e.g. z.dapper.plus is not free and thus you may need to update the package version to renew the trial.)
