using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.Interfaces;
using api.Repositories.ValueObjects;
using api.RequestHelpers;
using Dapper;
using Npgsql;

namespace api.Repositories
{
    public class DonationRecordRepository : IDonationRecordRepository
    {
        private readonly IConfiguration _configuration;

        public DonationRecordRepository(IConfiguration configuration)
        {
            _configuration =
                configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<DonationRecord>> GetRecords(
            string state,
            DateOnly startDate,
            DateOnly endDate
        )
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            List<DonationRecord> records = (
                await connection.QueryAsync<DonationRecord>(
                    "SELECT * FROM DonationRecord WHERE State = @state AND Date BETWEEN @startDate AND @endDate",
                    new
                    {
                        state = state,
                        startDate = startDate,
                        endDate = endDate
                    }
                )
            ).ToList();

            return records;
        }

        public async Task<bool> CreateRecord(DonationRecord record)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            var affected = await connection.ExecuteAsync(
                "INSERT INTO DonationRecord (Date, State, Daily, Blood_A, Blood_B, Blood_O, Blood_AB, Location_Centre, Location_Mobile, Type_WholeBlood, Type_ApheresisPlatelet, Type_ApheresisPlasma, Type_Other, Social_Civilian, Social_Student, Social_PoliceArmy, Donor_New, Donor_Regular, Donor_Irregular) VALUES (@date, @state, @daily, @blood_A, @blood_B, @blood_O, @blood_AB, @location_Centre, @location_Mobile, @type_WholeBlood, @type_ApheresisPlatelet, @type_ApheresisPlasma, @type_Other, @social_Civilian, @social_Student, @social_PoliceArmy, @donor_New, @donor_Regular, @donor_Irregular)",
                new
                {
                    date = record.Date,
                    state = record.State,
                    daily = record.Daily,
                    blood_A = record.Blood_A,
                    blood_B = record.Blood_B,
                    blood_O = record.Blood_O,
                    blood_AB = record.Blood_AB,
                    location_Centre = record.Location_Centre,
                    location_Mobile = record.Location_Mobile,
                    type_WholeBlood = record.Type_WholeBlood,
                    type_ApheresisPlatelet = record.Type_ApheresisPlatelet,
                    type_ApheresisPlasma = record.Type_ApheresisPlasma,
                    type_Other = record.Type_Other,
                    social_Civilian = record.Social_Civilian,
                    social_Student = record.Social_Student,
                    social_PoliceArmy = record.Social_PoliceArmy,
                    donor_New = record.Donor_New,
                    donor_Regular = record.Donor_Regular,
                    donor_Irregular = record.Donor_Irregular
                }
            );

            if (affected == 0)
                return false;

            return true;
        }

        public async Task<List<TimeSeriesData>> GetDailyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getDailyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (
                await connection.QueryAsync<TimeSeriesData>(query, new { state = state })
            ).ToList();

            return data;
        }

        public async Task<List<TimeSeriesData>> GetMonthlyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getMonthlyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (
                await connection.QueryAsync<TimeSeriesData>(query, new { state = state })
            ).ToList();

            return data;
        }

        public async Task<List<TimeSeriesData>> GetYearlyRecords(string state, string attribute)
        {
            using var connection = new NpgsqlConnection(getConnectionString());

            string query = getYearlyDataQueryBasedOnAttribute(attribute);

            List<TimeSeriesData> data = (
                await connection.QueryAsync<TimeSeriesData>(query, new { state = state })
            ).ToList();

            return data;
        }

        public async Task<RecentRatioData> GetRecentRatio(string interval = "month")
        {
            if (interval != "month" && interval != "year")
                return null;

            using var connection = new NpgsqlConnection(getConnectionString());

            string query =
                @$"
                SELECT 	state, 
                        ROUND(100.0 * sum(blood_a)/sum(daily), 1) AS blood_a,
		                ROUND(100.0 * sum(blood_b)/sum(daily), 1) AS blood_b,
                        ROUND(100.0 * sum(blood_o)/sum(daily), 1) AS blood_o,
                        ROUND(100.0 * sum(blood_ab)/sum(daily), 1) AS blood_ab,
                        ROUND(100.0 * sum(location_centre)/sum(daily), 1) AS location_centre,
                        ROUND(100.0 * sum(location_mobile)/sum(daily), 1) AS location_mobile,
                        ROUND(100.0 * sum(type_wholeblood)/sum(daily), 1) AS type_wholeblood,
                        ROUND(100.0 * (sum(type_apheresisplatelet) + sum(type_apheresisplasma))/sum(daily), 1) AS type_apheresis,
                        ROUND(100.0 * sum(social_civilian)/sum(daily), 1) AS social_civilian,
                        ROUND(100.0 * sum(social_student)/sum(daily), 1) AS social_student,
                        ROUND(100.0 * sum(social_policearmy)/sum(daily), 1) AS social_uniformedBodies,
                        ROUND(100.0 * sum(donor_new)/sum(daily), 1) AS donor_new,
                        ROUND(100.0 * sum(donor_regular)/sum(daily), 1) AS donor_regular,
                        ROUND(100.0 * sum(donor_irregular)/sum(daily), 1) AS donor_lapsed
                FROM donationrecord
                WHERE date >= (CURRENT_DATE - INTERVAL '1 {interval}') AND state = 'Malaysia'
                GROUP BY state";

            var data = (await connection.QueryAsync<RecentRatioData>(query)).FirstOrDefault();

            return data;
        }

        private string getConnectionString()
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connStr;

            if (env == "Development")
            {
                connStr = _configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
            }
            else
            {
                // var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // connUrl = connUrl.Replace("postgres://", string.Empty);
                // var pgUserPass = connUrl.Split("@")[0];
                // var pgHostDb = connUrl.Split("@")[1];
                // var pgHost = pgHostDb.Split("/")[0];
                // var pgDb = pgHostDb.Split("/")[1];
                // var pgUser = pgUserPass.Split(":")[0];
                // var pgPass = pgUserPass.Split(":")[1];
                var pgHost = Environment.GetEnvironmentVariable("DB_HOST");
                var pgDb = Environment.GetEnvironmentVariable("DB_NAME");
                var pgUser = Environment.GetEnvironmentVariable("DB_USER");
                var pgPass = Environment.GetEnvironmentVariable("DB_PW");
                var pgPort = 5432;

                connStr =
                    $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
            }
            return connStr;
        }

        private string getDailyDataQueryBasedOnAttribute(string attribute)
        {
            switch (attribute.ToLower())
            {
                case "daily":
                    return "SELECT Date as Date, Daily as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "blood_a":
                    return "SELECT Date as Date, Blood_A as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "blood_b":
                    return "SELECT Date as Date, Blood_B as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "blood_o":
                    return "SELECT Date as Date, Blood_O as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "blood_ab":
                    return "SELECT Date as Date, Blood_AB as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "location_centre":
                    return "SELECT Date as Date, Location_Centre as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "location_mobile":
                    return "SELECT Date as Date, Location_Mobile as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "type_wholeblood":
                    return "SELECT Date as Date, Type_WholeBlood as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "type_apheresisplatelet":
                    return "SELECT Date as Date, Type_ApheresisPlatelet as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "type_apheresisplasma":
                    return "SELECT Date as Date, Type_ApheresisPlasma as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "type_other":
                    return "SELECT Date as Date, Type_Other as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "social_civilian":
                    return "SELECT Date as Date, Social_Civilian as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "social_student":
                    return "SELECT Date as Date, Social_Student as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "social_policearmy":
                    return "SELECT Date as Date, Social_PoliceArmy as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "donor_new":
                    return "SELECT Date as Date, Donor_New as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "donor_regular":
                    return "SELECT Date as Date, Donor_Regular as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                case "donor_irregular":
                    return "SELECT Date as Date, Donor_Irregular as Value FROM DonationRecord WHERE State = @state ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }

        private string getMonthlyDataQueryBasedOnAttribute(string attribute)
        {
            switch (attribute.ToLower())
            {
                case "daily":
                    return "SELECT MIN(Date) as Date, SUM(Daily) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_a":
                    return "SELECT MIN(Date) as Date, SUM(Blood_A) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_b":
                    return "SELECT MIN(Date) as Date, SUM(Blood_B) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_o":
                    return "SELECT MIN(Date) as Date, SUM(Blood_O) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_ab":
                    return "SELECT MIN(Date) as Date, SUM(Blood_AB) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "location_centre":
                    return "SELECT MIN(Date) as Date, SUM(Location_Centre) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "location_mobile":
                    return "SELECT MIN(Date) as Date, SUM(Location_Mobile) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_wholeblood":
                    return "SELECT MIN(Date) as Date, SUM(Type_WholeBlood) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_apheresisplatelet":
                    return "SELECT MIN(Date) as Date, SUM(Type_ApheresisPlatelet) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_apheresisplasma":
                    return "SELECT MIN(Date) as Date, SUM(Type_ApheresisPlasma) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_other":
                    return "SELECT MIN(Date) as Date, SUM(Type_Other) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_civilian":
                    return "SELECT MIN(Date) as Date, SUM(Social_Civilian) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_student":
                    return "SELECT MIN(Date) as Date, SUM(Social_Student) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_policearmy":
                    return "SELECT MIN(Date) as Date, SUM(Social_PoliceArmy) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_new":
                    return "SELECT MIN(Date) as Date, SUM(Donor_New) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_regular":
                    return "SELECT MIN(Date) as Date, SUM(Donor_Regular) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_irregular":
                    return "SELECT MIN(Date) as Date, SUM(Donor_Irregular) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('month', Date), DATE_PART('year', Date) ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }

        private string getYearlyDataQueryBasedOnAttribute(string attribute)
        {
            switch (attribute.ToLower())
            {
                case "daily":
                    return "SELECT MIN(Date) as Date, SUM(Daily) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_a":
                    return "SELECT MIN(Date) as Date, SUM(Blood_A) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_b":
                    return "SELECT MIN(Date) as Date, SUM(Blood_B) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_o":
                    return "SELECT MIN(Date) as Date, SUM(Blood_O) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "blood_ab":
                    return "SELECT MIN(Date) as Date, SUM(Blood_AB) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "location_centre":
                    return "SELECT MIN(Date) as Date, SUM(Location_Centre) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "location_mobile":
                    return "SELECT MIN(Date) as Date, SUM(Location_Mobile) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_wholeblood":
                    return "SELECT MIN(Date) as Date, SUM(Type_WholeBlood) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_apheresisplatelet":
                    return "SELECT MIN(Date) as Date, SUM(Type_ApheresisPlatelet) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_apheresisplasma":
                    return "SELECT MIN(Date) as Date, SUM(Type_ApheresisPlasma) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "type_other":
                    return "SELECT MIN(Date) as Date, SUM(Type_Other) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_civilian":
                    return "SELECT MIN(Date) as Date, SUM(Social_Civilian) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_student":
                    return "SELECT MIN(Date) as Date, SUM(Social_Student) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "social_policearmy":
                    return "SELECT MIN(Date) as Date, SUM(Social_PoliceArmy) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_new":
                    return "SELECT MIN(Date) as Date, SUM(Donor_New) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_regular":
                    return "SELECT MIN(Date) as Date, SUM(Donor_Regular) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                case "donor_irregular":
                    return "SELECT MIN(Date) as Date, SUM(Donor_Irregular) as Value FROM DonationRecord WHERE State = @state GROUP BY DATE_PART('year', Date) ORDER BY Date ASC";
                default:
                    throw new ArgumentException("Invalid attribute");
            }
        }
    }
}
