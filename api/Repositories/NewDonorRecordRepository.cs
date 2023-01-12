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
    public class NewDonorRecordRepository : INewDonorRecordRepository
    {
        private readonly IConfiguration _configuration;

        public NewDonorRecordRepository(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<List<NewDonorRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate)
        {
            using var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString") ?? Environment.GetEnvironmentVariable("DbConnectionString"));
        
            List<NewDonorRecord> records = (await connection.QueryAsync<NewDonorRecord>("SELECT * FROM NewDonorRecords WHERE State = @state AND Date BETWEEN @startDate AND @endDate", new { state = state, startDate = startDate, endDate = endDate })).ToList();
        
            return records;
        }

        public async Task<bool> CreateRecord(NewDonorRecord record)
        {
            using var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString") ?? Environment.GetEnvironmentVariable("DbConnectionString"));

            var affected = await connection.ExecuteAsync("INSERT INTO NewDonorRecords (Date, State, AgeGroup17_24, AgeGroup25_29, AgeGroup30_34, AgeGroup35_39, AgeGroup40_44, AgeGroup45_49, AgeGroup50_54, AgeGroup55_59, AgeGroup60_64, AgeGroupOther, Total) VALUES (@date, @state, @ageGroup17_24, @ageGroup25_29, @ageGroup30_34, @ageGroup35_39, @ageGroup40_44, @ageGroup45_49, @ageGroup50_54, @ageGroup55_59, @ageGroup60_64, @ageGroupOther, @total)", 
                new { date=record.Date, state=record.State, ageGroup17_24=record.AgeGroup17_24, ageGroup25_29=record.AgeGroup25_29, ageGroup30_34=record.AgeGroup30_34, ageGroup35_39=record.AgeGroup35_39, ageGroup40_44=record.AgeGroup40_44, ageGroup45_49=record.AgeGroup45_49, ageGroup50_54=record.AgeGroup50_54, ageGroup55_59=record.AgeGroup55_59, ageGroup60_64=record.AgeGroup60_64, ageGroupOther=record.AgeGroupOther, total=record.Total });
        
            if (affected == 0)
                return false;
            
            return true;
        }
    }
}