using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.RequestHelpers;

namespace api.Repositories.ValueObjects
{
    public class RecentNewDonor
    {
        public int AgeGroup17_24 { get; set; }
        public int AgeGroup25_29 { get; set; }
        public int AgeGroup30_34 { get; set; }
        public int AgeGroup35_39 { get; set; }
        public int AgeGroup40_44 { get; set; }
        public int AgeGroup45_49 { get; set; }
        public int AgeGroup50_54 { get; set; }
        public int AgeGroup55_59 { get; set; }

        public List<ItemValue> mapIntoResponse()
        {
            ItemValue ageGroup17_24 = new ItemValue("17-24", this.AgeGroup17_24);
            ItemValue ageGroup25_29 = new ItemValue("25-29", this.AgeGroup25_29);
            ItemValue ageGroup30_34 = new ItemValue("30-34", this.AgeGroup30_34);
            ItemValue ageGroup35_39 = new ItemValue("35-39", this.AgeGroup35_39);
            ItemValue ageGroup40_44 = new ItemValue("40-44", this.AgeGroup40_44);
            ItemValue ageGroup45_49 = new ItemValue("45-49", this.AgeGroup45_49);
            ItemValue ageGroup50_54 = new ItemValue("50-54", this.AgeGroup50_54);
            ItemValue ageGroup55_59 = new ItemValue("55-59", this.AgeGroup55_59);
            return new List<ItemValue>()
            {
                ageGroup17_24,
                ageGroup25_29,
                ageGroup30_34,
                ageGroup35_39,
                ageGroup40_44,
                ageGroup45_49,
                ageGroup50_54,
                ageGroup55_59
            };
        }
    }
}
