using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.ValueObjects;
using api.RequestHelpers;

namespace api.Repositories.Interfaces
{
    public interface IDonationRecordRepository
    {
        Task<List<DonationRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate);
        Task<bool> CreateRecord(DonationRecord record);
        Task<List<TimeSeriesData>> GetDailyRecords(string state, string attribute);
        Task<List<TimeSeriesData>> GetMonthlyRecords(string state, string attribute);
        Task<List<TimeSeriesData>> GetYearlyRecords(string state, string attribute);
        Task<RecentRatioData> GetRecentRatio(string interval);
        Task<List<YearlyRatioData>> GetYearlyRatio();
    }
}
