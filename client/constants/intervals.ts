export type Interval = {
  id: number;
  displayName: string;
  pathName: string;
};

export const intervals: Interval[] = [
  { id: 1, displayName: 'Daily', pathName: 'daily' },
  { id: 2, displayName: 'Monthly', pathName: 'monthly' },
  { id: 3, displayName: 'Yearly', pathName: 'yearly' },
];
