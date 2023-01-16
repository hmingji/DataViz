using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.Interfaces;
using Dapper;
using Npgsql;

namespace api.Repositories
{
    public class DonationRecordRepository : IDonationRecordRepository
    {
        private readonly IConfiguration _configuration;

        public DonationRecordRepository(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<DonationRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate)
        {
            using var connection = new NpgsqlConnection(_configuration.GetValue<string>("ConnectionStrings:DefaultConnection") ?? Environment.GetEnvironmentVariable("DbConnectionString"));
        
            List<DonationRecord> records = (await connection.QueryAsync<DonationRecord>("SELECT * FROM DonationRecord WHERE State = @state AND Date BETWEEN @startDate AND @endDate", new { state = state, startDate = startDate, endDate = endDate })).ToList();
        
            return records;
        }

        public async Task<bool> CreateRecord(DonationRecord record)
        {
            using var connection = new NpgsqlConnection(_configuration.GetValue<string>("ConnectionStrings:DefaultConnection") ?? Environment.GetEnvironmentVariable("DbConnectionString"));

            var affected = await connection.ExecuteAsync("INSERT INTO DonationRecord (Date, State, Daily, Blood_A, Blood_B, Blood_O, Blood_AB, Location_Centre, Location_Mobile, Type_WholeBlood, Type_ApheresisPlatelet, Type_ApheresisPlasma, Type_Other, Social_Civilian, Social_Student, Social_PoliceArmy, Donor_New, Donor_Regular, Donor_Irregular) VALUES (@date, @state, @daily, @blood_A, @blood_B, @blood_O, @blood_AB, @location_Centre, @location_Mobile, @type_WholeBlood, @type_ApheresisPlatelet, @type_ApheresisPlasma, @type_Other, @social_Civilian, @social_Student, @social_PoliceArmy, @donor_New, @donor_Regular, @donor_Irregular)", 
                new { date=record.Date, state=record.State, daily=record.Daily, blood_A=record.Blood_A, blood_B=record.Blood_B, blood_O=record.Blood_O, blood_AB=record.Blood_AB, location_Centre=record.Location_Centre, location_Mobile=record.Location_Mobile, type_WholeBlood=record.Type_WholeBlood, type_ApheresisPlatelet=record.Type_ApheresisPlatelet, type_ApheresisPlasma=record.Type_ApheresisPlasma, type_Other=record.Type_Other, social_Civilian=record.Social_Civilian, social_Student=record.Social_Student, social_PoliceArmy=record.Social_PoliceArmy, donor_New=record.Donor_New, donor_Regular=record.Donor_Regular, donor_Irregular=record.Donor_Irregular });
        
            if (affected == 0)
                return false;
            
            return true;
        }
    }
}