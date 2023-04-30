using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class NewDonorRecord
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string State { get; set; }
        public int AgeGroup17_24 { get; set; }
        public int AgeGroup25_29 { get; set; }
        public int AgeGroup30_34 { get; set; }
        public int AgeGroup35_39 { get; set; }
        public int AgeGroup40_44 { get; set; }
        public int AgeGroup45_49 { get; set; }
        public int AgeGroup50_54 { get; set; }
        public int AgeGroup55_59 { get; set; }
        public int AgeGroup60_64 { get; set; }
        public int AgeGroupOther { get; set; }
        public int Total { get; set; }
    }
}
