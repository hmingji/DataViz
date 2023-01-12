using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class DonationRecord
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string State { get; set; } 
        public int Daily { get; set; }
        public int Blood_A { get; set; }
        public int Blood_B { get; set; }
        public int Blood_O { get; set; }
        public int Blood_AB { get; set; }
        public int Location_Centre { get; set; }
        public int Location_Mobile { get; set; }
        public int Type_WholeBlood { get; set; }
        public int Type_ApheresisPlatelet { get; set; }
        public int Type_ApheresisPlasma { get; set; }
        public int Type_Other { get; set; }
        public int Social_Civilian { get; set; }
        public int Social_Student { get; set; }
        public int Social_PoliceArmy { get; set; }
        public int Donor_New { get; set; }
        public int Donor_Regular { get; set; }
        public int Donor_Irregular { get; set; }
    }
}