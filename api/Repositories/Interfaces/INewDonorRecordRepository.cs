using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.RequestHelpers;

namespace api.Repositories.Interfaces
{
    public interface INewDonorRecordRepository
    {
        Task<List<NewDonorRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate);
        Task<bool> CreateRecord(NewDonorRecord record);
        Task<List<TimeSeriesData>> GetDailyRecords(string state, string attribute);
        Task<List<TimeSeriesData>> GetMonthlyRecords(string state, string attribute);
        Task<List<TimeSeriesData>> GetYearlyRecords(string state, string attribute);
    }
}
