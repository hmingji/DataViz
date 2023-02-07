export type Interval = {
  id: number;
  displayName: string;
  pathName: string;
  chartUnit: 'day' | 'month' | 'year';
};

export const intervals: Interval[] = [
  { id: 1, displayName: 'Daily', pathName: 'daily', chartUnit: 'day' },
  { id: 2, displayName: 'Monthly', pathName: 'monthly', chartUnit: 'month' },
  { id: 3, displayName: 'Yearly', pathName: 'yearly', chartUnit: 'year' },
];

export const defaultInterval = intervals.find(
  (i) => i.displayName === 'Yearly'
);
