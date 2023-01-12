using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Repositories.Interfaces;
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

        
    }
}