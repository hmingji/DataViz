using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.Interfaces;
using api.RequestHelpers;
using Dapper;
using Npgsql;

namespace api.Repositories
{
    public class NewDonorRecordRepository : INewDonorRecordRepository
    {
        private readonly IConfiguration _configuration;

        public NewDonorRecordRepository(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<NewDonorRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate)
        {
            using var connection = new NpgsqlConnection(getConnectionString());
        
            List<NewDonorRecord> records = (await connection.QueryAsync<NewDonorRecord>("SELECT * FROM NewDonorRecord WHERE State = @state AND Date BETWEEN @startDate AND @endDate", new { state = state, startDate = startDate, endDate = endDate })).ToList();
        
            return records;
        }

        public async Task<bool> CreateRecord(NewDonorRecord record)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            var affected = await connection.ExecuteAsync("INSERT INTO NewDonorRecord (Date, State, AgeGroup17_24, AgeGroup25_29, AgeGroup30_34, AgeGroup35_39, AgeGroup40_44, AgeGroup45_49, AgeGroup50_54, AgeGroup55_59, AgeGroup60_64, AgeGroupOther, Total) VALUES (@date, @state, @ageGroup17_24, @ageGroup25_29, @ageGroup30_34, @ageGroup35_39, @ageGroup40_44, @ageGroup45_49, @ageGroup50_54, @ageGroup55_59, @ageGroup60_64, @ageGroupOther, @total)", 
                new { date=record.Date, state=record.State, ageGroup17_24=record.AgeGroup17_24, ageGroup25_29=record.AgeGroup25_29, ageGroup30_34=record.AgeGroup30_34, ageGroup35_39=record.AgeGroup35_39, ageGroup40_44=record.AgeGroup40_44, ageGroup45_49=record.AgeGroup45_49, ageGroup50_54=record.AgeGroup50_54, ageGroup55_59=record.AgeGroup55_59, ageGroup60_64=record.AgeGroup60_64, ageGroupOther=record.AgeGroupOther, total=record.Total });
        
            if (affected == 0)
                return false;
            
            return true;
        }

        public async Task<List<TimeSeriesData>> GetDailyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getDailyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (await connection.QueryAsync<TimeSeriesData>(query, new { state = state })).ToList();
            
            return data;
        } 

        public async Task<List<TimeSeriesData>> GetMonthlyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getMonthlyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (await connection.QueryAsync<TimeSeriesData>(query, new { state = state })).ToList();
            
            return data;
        }

        public async Task<List<TimeSeriesData>> GetYearlyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getYearlyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (await connection.QueryAsync<TimeSeriesData>(query, new { state = state })).ToList();

            return data;
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

        private string getDailyDataQueryBasedOnAttribute(string attribute)
        {   
            switch (attribute.ToLower())
            {
                case "agegroup17_24":
                    return "SELECT Date as Date, AgeGroup17_24 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup25_29":
                    return "SELECT Date as Date, AgeGroup25_29 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup30_34":
                    return "SELECT Date as Date, AgeGroup30_34 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup35_39":
                    return "SELECT Date as Date, AgeGroup35_39 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup40_44":
                    return "SELECT Date as Date, AgeGroup40_44 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup45_49":
                    return "SELECT Date as Date, AgeGroup45_49 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup50_54":
                    return "SELECT Date as Date, AgeGroup50_54 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup55_59":
                    return "SELECT Date as Date, AgeGroup55_59 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroup60_64":
                    return "SELECT Date as Date, AgeGroup60_64 as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "agegroupother":
                    return "SELECT Date as Date, AgeGroupOther as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                case "total":
                    return "SELECT Date as Date, Total as Value FROM NewDonorRecord WHERE State = @state ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }

        private string getMonthlyDataQueryBasedOnAttribute(string attribute)
        {   
            switch (attribute.ToLower())
            {
                case "agegroup17_24":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup17_24) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup25_29":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup25_29) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup30_34":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup30_34) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup35_39":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup35_39) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup40_44":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup40_44) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup45_49":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup45_49) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup50_54":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup50_54) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup55_59":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup55_59) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup60_64":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup60_64) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroupother":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroupOther) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "total":
                    return "SELECT MIN(Date) as Date, SUM(Total) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }

        private string getYearlyDataQueryBasedOnAttribute(string attribute)
        {   
            switch (attribute.ToLower())
            {
                case "agegroup17_24":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup17_24) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup25_29":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup25_29) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup30_34":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup30_34) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup35_39":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup35_39) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup40_44":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup40_44) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup45_49":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup45_49) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup50_54":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup50_54) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup55_59":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup55_59) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroup60_64":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroup60_64) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "agegroupother":
                    return "SELECT MIN(Date) as Date, SUM(AgeGroupOther) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "total":
                    return "SELECT MIN(Date) as Date, SUM(Total) as Value FROM NewDonorRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }
    }
}