using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using CsvHelper.Configuration;

namespace api.ClassMaps
{
    public class DonationRecordMap : ClassMap<DonationRecord>
    {
        public DonationRecordMap()
        {
            Map(m => m.Date).Name("date");
            Map(m => m.State).Name("state");
            Map(m => m.Daily).Name("daily");
            Map(m => m.Blood_A).Name("blood_a");
            Map(m => m.Blood_B).Name("blood_b");
            Map(m => m.Blood_O).Name("blood_o");
            Map(m => m.Blood_AB).Name("blood_ab");
            Map(m => m.Location_Centre).Name("location_centre");
            Map(m => m.Location_Mobile).Name("location_mobile");
            Map(m => m.Type_WholeBlood).Name("type_wholeblood");
            Map(m => m.Type_ApheresisPlatelet).Name("type_apheresis_platelet");
            Map(m => m.Type_ApheresisPlasma).Name("type_apheresis_plasma");
            Map(m => m.Type_Other).Name("type_other");
            Map(m => m.Social_Civilian).Name("social_civilian");
            Map(m => m.Social_Student).Name("social_student");
            Map(m => m.Social_PoliceArmy).Name("social_policearmy");
            Map(m => m.Donor_New).Name("donations_new");
            Map(m => m.Donor_Regular).Name("donations_regular");
            Map(m => m.Donor_Irregular).Name("donations_irregular");
        }
    }
}
