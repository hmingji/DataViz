using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using CsvHelper.Configuration;

namespace api.ClassMaps
{
    public class NewDonorRecordMap : ClassMap<NewDonorRecord>
    {
        public NewDonorRecordMap()
        {
            Map(m => m.Date).Name("date");
            Map(m => m.State).Name("state");
            Map(m => m.AgeGroup17_24).Name("17-24");
            Map(m => m.AgeGroup25_29).Name("25-29");
            Map(m => m.AgeGroup30_34).Name("30-34");
            Map(m => m.AgeGroup35_39).Name("35-39");
            Map(m => m.AgeGroup40_44).Name("40-44");
            Map(m => m.AgeGroup45_49).Name("45-49");
            Map(m => m.AgeGroup50_54).Name("50-54");
            Map(m => m.AgeGroup55_59).Name("55-59");
            Map(m => m.AgeGroup60_64).Name("60-64");
            Map(m => m.AgeGroupOther).Name("other");
            Map(m => m.Total).Name("total");
        }
    }
}