using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using api.ClassMaps;
using api.Entities;
using api.Repositories.Interfaces;
using Coravel.Invocable;
using CsvHelper;
using Octokit;
using Npgsql;
using Z.Dapper.Plus;
using api.Utils;

namespace api.ScheduledJobs
{
    public class RetrieveDataFromGithub : IInvocable
    {  
        private ILogger<RetrieveDataFromGithub> _logger;
        private IConfiguration _configuration;

        public RetrieveDataFromGithub(IConfiguration configuration, ILogger<RetrieveDataFromGithub> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task Invoke()
        {
            string header = _configuration.GetValue<string>("GithubDataSource:Header") ?? Environment.GetEnvironmentVariable("GITHUBDATASOURCE_HEADER");
            string token = _configuration.GetValue<string>("GithubDataSource:Token") ?? Environment.GetEnvironmentVariable("GITHUBDATASOURCE_TOKEN");;
            string repoOwner = _configuration.GetValue<string>("GithubDataSource:RepoOwner") ?? Environment.GetEnvironmentVariable("GITHUBDATASOURCE_REPOOWNER");;
            string repoName = _configuration.GetValue<string>("GithubDataSource:RepoName") ?? Environment.GetEnvironmentVariable("GITHUBDATASOURCE_REPONAME");;
            
            var githubClient = new GitHubClient(new ProductHeaderValue(header));
            var tokenAuth = new Credentials(token);
            githubClient.Credentials = tokenAuth;   
            var results = await githubClient.Repository.Content.GetAllContents(repoOwner, repoName);
            
            using var connection = new NpgsqlConnection(getConnectionString());
            connection.Open();
            try
            {
                await InitializeTable(connection);
                _logger.LogInformation("Completed initializing tables");
                
                string donationRecordDownloadUrl = results.FirstOrDefault(item => item.Name == "donations_state.csv").DownloadUrl;
                var donationRecordFetcher = new DataFetcher<DonationRecord, DonationRecordMap>(donationRecordDownloadUrl);
                await donationRecordFetcher.GetCsvData();
                await donationRecordFetcher.BulkInsertCsvData(connection, "donationrecord");
                _logger.LogInformation("Completed storing donation record");

                string newDonorRecordDownloadUrl = results.FirstOrDefault(item => item.Name == "newdonors_state.csv").DownloadUrl;
                var newDonorRecordFetcher = new DataFetcher<NewDonorRecord, NewDonorRecordMap>(newDonorRecordDownloadUrl);
                await newDonorRecordFetcher.GetCsvData();
                await newDonorRecordFetcher.BulkInsertCsvData(connection, "newdonorrecord");
                _logger.LogInformation("Completed storing new donor record");
            } 
            catch (Exception ex)
            {
                _logger.LogError($"error: {ex.ToString()}");
            }
        }

        private string getConnectionString() {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            if (env == "Development")
            {
                connStr = _configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
            }
            else
            {
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                connUrl = connUrl.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostDb = connUrl.Split("@")[1];
                var pgHost = pgHostDb.Split("/")[0];
                var pgDb = pgHostDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgPort = 5432;

                connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
            }
            return connStr;
        }
        
        private async Task InitializeTable(NpgsqlConnection connection)
        {
            try
            {
                using var command = new NpgsqlCommand
                {
                    Connection = connection
                };

                command.CommandText = "DROP TABLE IF EXISTS DonationRecord";
                await command.ExecuteNonQueryAsync();

                command.CommandText = "DROP TABLE IF EXISTS NewDonorRecord";
                await command.ExecuteNonQueryAsync();

                command.CommandText = @"CREATE TABLE IF NOT EXISTS DonationRecord
                                        (Id SERIAL PRIMARY KEY,
                                        Date DATE,
                                        State TEXT,
                                        Daily INTEGER,
                                        Blood_A INTEGER,
                                        Blood_B INTEGER,
                                        Blood_O INTEGER,
                                        Blood_AB INTEGER,
                                        Location_Centre INTEGER,
                                        Location_Mobile INTEGER,
                                        Type_WholeBlood INTEGER,
                                        Type_ApheresisPlatelet INTEGER,
                                        Type_ApheresisPlasma INTEGER,
                                        Type_Other INTEGER,
                                        Social_Civilian INTEGER,
                                        Social_Student INTEGER,
                                        Social_PoliceArmy INTEGER,
                                        Donor_New INTEGER,
                                        Donor_Regular INTEGER,
                                        Donor_Irregular INTEGER)";
                await command.ExecuteNonQueryAsync();

                command.CommandText = @"CREATE TABLE IF NOT EXISTS NewDonorRecord
                                        (Id SERIAL PRIMARY KEY,
                                        Date DATE,
                                        State TEXT,
                                        AgeGroup17_24 INTEGER,
                                        AgeGroup25_29 INTEGER,
                                        AgeGroup30_34 INTEGER,
                                        AgeGroup35_39 INTEGER,
                                        AgeGroup40_44 INTEGER,
                                        AgeGroup45_49 INTEGER,
                                        AgeGroup50_54 INTEGER,
                                        AgeGroup55_59 INTEGER,
                                        AgeGroup60_64 INTEGER,
                                        AgeGroupOther INTEGER,
                                        Total INTEGER)";
                await command.ExecuteNonQueryAsync();
            } catch (Exception ex) 
            {
                _logger.LogError($"Initializing table error: {ex.ToString()}");
            }
        }
    }
}