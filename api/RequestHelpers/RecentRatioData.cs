using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class RecentRatioData
    {
        public string state { get; set; }
        public float blood_a { get; set; }
        public float blood_b { get; set; }
        public float blood_o { get; set; }
        public float blood_ab { get; set; }
        public float location_centre { get; set; }
        public float location_mobile { get; set; }
        public float type_wholeblood { get; set; }
        public float type_apheresis { get; set; }
        public float social_civilian { get; set; }
        public float social_student { get; set; }
        public float social_uniformedBodies { get; set; }
        public float donor_new { get; set; }
        public float donor_regular { get; set; }
        public float donor_lapsed { get; set; }

        public List<DonationVariable> mapIntoVariables()
        {
            //List<DonationVariable> result;
            ItemValue bloodA = new ItemValue("A", this.blood_a);
            ItemValue bloodB = new ItemValue("B", this.blood_b);
            ItemValue bloodO = new ItemValue("O", this.blood_o);
            ItemValue bloodAB = new ItemValue("AB", this.blood_ab);
            DonationVariable bloodGroup = new DonationVariable(
                "Blood Group",
                new List<ItemValue>() { bloodA, bloodAB, bloodB, bloodO }
            );
            ItemValue centre = new ItemValue("Donation Centre", this.location_centre);
            ItemValue mobile = new ItemValue("Mobile", this.location_mobile);
            DonationVariable location = new DonationVariable(
                "Donation Location",
                new List<ItemValue>() { centre, mobile }
            );
            ItemValue whole = new ItemValue("Whole Blood", this.type_wholeblood);
            ItemValue apheresis = new ItemValue("Apheresis", this.type_apheresis);
            DonationVariable type = new DonationVariable(
                "Donation Type",
                new List<ItemValue>() { whole, apheresis }
            );
            ItemValue civilian = new ItemValue("Civilian", this.social_civilian);
            ItemValue student = new ItemValue("Student", this.social_student);
            ItemValue uniformedBodies = new ItemValue(
                "Uniformed Bodies",
                this.social_uniformedBodies
            );
            DonationVariable social = new DonationVariable(
                "Social Group",
                new List<ItemValue>() { civilian, student, uniformedBodies }
            );
            ItemValue newDonor = new ItemValue("New Donor", this.donor_new);
            ItemValue lapsedDonor = new ItemValue("Lapsed Donor", this.donor_lapsed);
            ItemValue regularDonor = new ItemValue("Regular Donor", this.donor_regular);
            DonationVariable donor = new DonationVariable(
                "Donor Regularity",
                new List<ItemValue>() { newDonor, lapsedDonor, regularDonor }
            );
            return new List<DonationVariable>() { bloodGroup, location, type, social, donor };
        }
    }
}
