import { DateTime } from 'luxon';

export type Interval = {
  id: number;
  displayName: string;
  pathName: string;
  chartUnit: 'day' | 'month' | 'year';
  chartLimit: { min: number; max: number };
};

const startOfYear2016 = DateTime.now()
  .set({
    year: 2016,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    millisecond: 0,
  })
  .toMillis();

const fiveDaysAfterToday = DateTime.now()
  .set({
    hour: 0,
    minute: 0,
    millisecond: 0,
  })
  .plus({ day: 5 })
  .toMillis();

const oneMonthAfterCurrentMonth = DateTime.now()
  .set({
    hour: 0,
    minute: 0,
    millisecond: 0,
  })
  .plus({ month: 1 })
  .toMillis();

const oneYearAfterCurrentYear = DateTime.now()
  .set({
    hour: 0,
    minute: 0,
    millisecond: 0,
  })
  .plus({ year: 1 })
  .toMillis();

export const intervals: Interval[] = [
  {
    id: 1,
    displayName: 'Daily',
    pathName: 'daily',
    chartUnit: 'day',
    chartLimit: {
      min: startOfYear2016,
      max: fiveDaysAfterToday,
    },
  },
  {
    id: 2,
    displayName: 'Monthly',
    pathName: 'monthly',
    chartUnit: 'month',
    chartLimit: { min: startOfYear2016, max: oneMonthAfterCurrentMonth },
  },
  {
    id: 3,
    displayName: 'Yearly',
    pathName: 'yearly',
    chartUnit: 'year',
    chartLimit: { min: startOfYear2016, max: oneYearAfterCurrentYear },
  },
];

export const defaultInterval = intervals.find(
  (i) => i.displayName === 'Yearly'
);
