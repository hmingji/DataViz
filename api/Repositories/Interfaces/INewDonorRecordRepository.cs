using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories.Interfaces
{
    public interface INewDonorRecordRepository
    {
        Task<List<NewDonorRecord>> GetRecords(string state, DateOnly startDate, DateOnly endDate);
        Task<bool> CreateRecord(NewDonorRecord record);
    }
}