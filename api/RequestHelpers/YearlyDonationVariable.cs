using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class YearlyDonationVariable
    {
        public int Year { get; set; }

        public List<DonationVariable> Variables { get; set; }

        public YearlyDonationVariable(int year, List<DonationVariable> variables)
        {
            this.Year = year;
            this.Variables = variables;
        }
    }
}
