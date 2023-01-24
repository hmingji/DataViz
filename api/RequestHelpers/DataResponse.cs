using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class DataResponse<T>
    {
        public List<T> Data { get; set; }
        public MetaData MetaData { get; set; }
        public DataResponse(List<T> items, string attribute, string state, string interval)
        {
            MetaData = new MetaData
            {
                Attribute = attribute,
                State = state,
                Interval = interval
            };
            Data = new List<T>(items);
        }
    }
}