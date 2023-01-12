using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories.Interfaces
{
    public interface IDonationRecordRepository
    {
        Task<List<DonationRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate);
        Task<bool> CreateRecord(DonationRecord record);
    }
}