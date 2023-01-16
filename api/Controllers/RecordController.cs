using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.Interfaces;
using api.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly IDonationRecordRepository _donationRecordRepository;
        private readonly INewDonorRecordRepository _newDonorRecordRepository;

        public RecordController(IDonationRecordRepository donationRecordRepository, INewDonorRecordRepository newDonorRecordRepository)
        {
            _donationRecordRepository = donationRecordRepository ?? throw new ArgumentNullException(nameof(donationRecordRepository));
            _newDonorRecordRepository = newDonorRecordRepository ?? throw new ArgumentNullException(nameof(newDonorRecordRepository));
        }

        [HttpGet("donation", Name = "GetDonationRecords")]
        public async Task<ActionResult<List<DonationRecord>>> GetDonationRecords([FromQuery] RecordParams recordParams)
        {
            var records = await _donationRecordRepository.GetRecords(recordParams.State, recordParams.StartDate, recordParams.EndDate);
            
            if (records == null) return NotFound();

            return records;
        }

        [HttpGet("newdonor", Name = "GetNewDonorRecords")]
        public async Task<ActionResult<List<NewDonorRecord>>> GetNewDonorRecords([FromQuery] RecordParams recordParams)
        {
            var records = await _newDonorRecordRepository.GetRecords(recordParams.State, recordParams.StartDate, recordParams.EndDate);

            if (records == null) return NotFound();

            return records;
        }
    }
}