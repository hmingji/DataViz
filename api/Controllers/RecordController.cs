using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories.Interfaces;
using api.Repositories.ValueObjects;
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

        public RecordController(
            IDonationRecordRepository donationRecordRepository,
            INewDonorRecordRepository newDonorRecordRepository
        )
        {
            _donationRecordRepository =
                donationRecordRepository
                ?? throw new ArgumentNullException(nameof(donationRecordRepository));
            _newDonorRecordRepository =
                newDonorRecordRepository
                ?? throw new ArgumentNullException(nameof(newDonorRecordRepository));
        }

        [HttpGet("donation", Name = "GetDonationRecords")]
        public async Task<ActionResult<List<DonationRecord>>> GetDonationRecords(
            [FromQuery] RecordParams recordParams
        )
        {
            var records = await _donationRecordRepository.GetRecords(
                recordParams.State,
                recordParams.StartDate,
                recordParams.EndDate
            );
            //var filteredRecords = records.Select ;
            if (records == null)
                return NotFound();

            return records;
        }

        [HttpGet("donation/ratio", Name = "GetRecentRatio")]
        public async Task<ActionResult<List<DonationVariable>>> GetRecentRatio(
            [FromQuery] RecordParams recordParams
        )
        {
            RecentRatioData data = await _donationRecordRepository.GetRecentRatio(
                recordParams.interval ?? "month"
            );
            if (data == null)
                return NotFound();

            return data.mapIntoVariables();
        }

        [HttpGet("donation/daily/{attribute}", Name = "GetDailyDonationData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetDailyDonationData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _donationRecordRepository.GetDailyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "daily"
            );

            return result;
        }

        [HttpGet("donation/monthly/{attribute}", Name = "GetMonthlyDonationData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetMonthlyDonationData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _donationRecordRepository.GetMonthlyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "monthly"
            );

            return result;
        }

        [HttpGet("donation/yearly/{attribute}", Name = "GetYearlyDonationData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetYearlyDonationData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _donationRecordRepository.GetYearlyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "yearly"
            );

            return result;
        }

        //for testing purpose
        // [Route("[action]")]
        // [HttpPost]
        // public async Task<ActionResult<bool>> CreateDonationRecord([FromBody] DonationRecord donationRecord)
        // {
        //     return Ok(await _donationRecordRepository.CreateRecord(donationRecord));
        // }

        [HttpGet("newdonor", Name = "GetNewDonorRecords")]
        public async Task<ActionResult<List<NewDonorRecord>>> GetNewDonorRecords(
            [FromQuery] RecordParams recordParams
        )
        {
            var records = await _newDonorRecordRepository.GetRecords(
                recordParams.State,
                recordParams.StartDate,
                recordParams.EndDate
            );

            if (records == null)
                return NotFound();

            return records;
        }

        [HttpGet("newdonor/recent", Name = "GetRecentNewDonorOverview")]
        public async Task<ActionResult<List<ItemValue>>> GetRecentNewDonorOverview(
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _newDonorRecordRepository.getRecentOverview(
                recordParams.interval ?? "month"
            );
            if (data == null)
                return NotFound();
            return data.mapIntoResponse();
        }

        [HttpGet("newdonor/daily/{attribute}", Name = "GetDailyNewDonorData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetDailyNewDonorData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _newDonorRecordRepository.GetDailyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "daily"
            );

            return result;
        }

        [HttpGet("newdonor/monthly/{attribute}", Name = "GetMonthlyNewDonorData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetMonthlyNewDonorData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _newDonorRecordRepository.GetMonthlyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "monthly"
            );

            return result;
        }

        [HttpGet("newdonor/yearly/{attribute}", Name = "GetYearlyNewDonorData")]
        public async Task<ActionResult<DataResponse<TimeSeriesData>>> GetYearlyNewDonorData(
            string attribute,
            [FromQuery] RecordParams recordParams
        )
        {
            var data = await _newDonorRecordRepository.GetYearlyRecords(
                recordParams.State,
                attribute
            );
            if (data == null)
                return NotFound();
            //TODO: create a interval constants to replace the monthly string
            var result = new DataResponse<TimeSeriesData>(
                data,
                attribute,
                recordParams.State,
                "yearly"
            );

            return result;
        }
    }
}
