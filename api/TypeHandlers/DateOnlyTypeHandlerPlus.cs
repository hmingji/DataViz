using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z.BulkOperations;

namespace api.TypeHandlers
{
    public class DateOnlyTypeHandlerPlus : BulkValueConverter<DateOnly>
    {
        public override DateOnly ConvertFromProvider(object value)
        {
            return DateOnly.FromDateTime((DateTime)value);
        }

        public override object ConvertToProvider(DateOnly value)
        {
            return value;
        }
    }
}