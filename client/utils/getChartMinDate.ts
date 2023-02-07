import { DateTime } from 'luxon';

const getChartMinDate = (chartUnit: 'day' | 'month' | 'year') => {
  switch (chartUnit) {
    case 'day':
      return DateTime.now()
        .set({ hour: 0, minute: 0, millisecond: 0 })
        .minus({ day: 30 })
        .toMillis();
    case 'month':
      return DateTime.now()
        .set({ day: 1, hour: 0, minute: 0, millisecond: 0 })
        .minus({ month: 12 })
        .toMillis();
    case 'year':
      return DateTime.now()
        .set({ day: 1, hour: 0, minute: 0, millisecond: 0 })
        .minus({ year: 10 })
        .toMillis();
    default:
      return DateTime.now()
        .set({ hour: 0, minute: 0, millisecond: 0 })
        .minus({ month: 12 })
        .toMillis();
  }
};

export default getChartMinDate;
