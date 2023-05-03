using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class LatestStatisticsResponse
    {
        public int Year { get; set; }
        public List<ItemValue> Items { get; set; }

        public LatestStatisticsResponse(int year, List<ItemValue> items)
        {
            this.Year = year;
            this.Items = items;
        }
    }
}
