using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class ItemValue
    {
        public string Name { get; set; }
        public float Value { get; set; }

        public ItemValue(string name, float value)
        {
            Name = name;
            Value = value;
        }
    }
}
