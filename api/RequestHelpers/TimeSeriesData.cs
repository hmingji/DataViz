using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class TimeSeriesData
    {
        public DateOnly Date { get; set; }
        public int Value { get; set; }
    }
}