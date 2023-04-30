using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class DonationVariable
    {
        public string Name { get; set; }
        public List<ItemValue> Items { get; set; }

        public DonationVariable(string name, List<ItemValue> items)
        {
            Name = name;
            Items = items;
        }
    }
}
