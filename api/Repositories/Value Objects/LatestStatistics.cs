using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.RequestHelpers;

namespace api.Repositories.ValueObjects
{
    public class LatestStatistics
    {
        public int Year { get; set; }
        public int TotalDonation { get; set; }
        public int NewDonor { get; set; }
        public int RegularDonor { get; set; }

        public LatestStatisticsResponse mapIntoResponse()
        {
            ItemValue totalDonation = new ItemValue("Total donation", this.TotalDonation);
            ItemValue newDonor = new ItemValue("New donor", this.NewDonor);
            ItemValue regularDonor = new ItemValue("Regular donor", this.RegularDonor);
            return new LatestStatisticsResponse(
                this.Year,
                new List<ItemValue>() { totalDonation, newDonor, regularDonor }
            );
        }
    }
}
