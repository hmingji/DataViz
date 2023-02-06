import { Color } from 'chart.js';

export type State = {
  id: number;
  displayName: string;
  paramValue: string;
  chartBackgroundColor: Color;
  chartBorderColor: Color;
};

export const states: State[] = [
  {
    id: 1,
    displayName: 'Malaysia',
    paramValue: 'Malaysia',
    chartBackgroundColor: 'rgba(150, 59, 199,0.5)',
    chartBorderColor: 'rgb(150, 59, 199)',
  },
  {
    id: 2,
    displayName: 'Johor',
    paramValue: 'Johor',
    chartBackgroundColor: 'rgba(54, 217, 4,0.5)',
    chartBorderColor: 'rgb(54, 217, 4)',
  },
  {
    id: 3,
    displayName: 'Kedah',
    paramValue: 'Kedah',
    chartBackgroundColor: 'rgba(199, 115, 85,0.5)',
    chartBorderColor: 'rgb(199, 115, 85)',
  },
  {
    id: 4,
    displayName: 'Kelantan',
    paramValue: 'Kelantan',
    chartBackgroundColor: 'rgba(240, 80, 112,0.5)',
    chartBorderColor: 'rgb(240, 80, 112)',
  },
  {
    id: 5,
    displayName: 'Melaka',
    paramValue: 'Melaka',
    chartBackgroundColor: 'rgba(54,246,236,0.5)',
    chartBorderColor: 'rgb(54, 246, 236)',
  },
  {
    id: 6,
    displayName: 'Negeri Sembilan',
    paramValue: 'Negeri Sembilan',
    chartBackgroundColor: 'rgba(38,78,160,0.5)',
    chartBorderColor: 'rgb(38, 78, 160)',
  },
  {
    id: 7,
    displayName: 'Pahang',
    paramValue: 'Pahang',
    chartBackgroundColor: 'rgba(82,50,132,0.5)',
    chartBorderColor: 'rgb(82, 50, 132)',
  },
  {
    id: 8,
    displayName: 'Perak',
    paramValue: 'Perak',
    chartBackgroundColor: 'rgba(125,121,94,0.5)',
    chartBorderColor: 'rgb(125, 121, 94)',
  },
  {
    id: 9,
    displayName: 'Pulau Pinang',
    paramValue: 'Pulau Pinang',
    chartBackgroundColor: 'rgba(240,221,124,0.5)',
    chartBorderColor: 'rgb(240, 221, 124)',
  },
  {
    id: 10,
    displayName: 'Sabah',
    paramValue: 'Sabah',
    chartBackgroundColor: 'rgba(111,148,191,0.5)',
    chartBorderColor: 'rgb(111, 148, 191)',
  },
  {
    id: 11,
    displayName: 'Sarawak',
    paramValue: 'Sarawak',
    chartBackgroundColor: 'rgba(11,140,140,0.5)',
    chartBorderColor: 'rgb(11, 140, 140)',
  },
  {
    id: 12,
    displayName: 'Selangor',
    paramValue: 'Selangor',
    chartBackgroundColor: 'rgba(254,190,140,0.5)',
    chartBorderColor: 'rgb(254, 190, 140))',
  },
  {
    id: 13,
    displayName: 'Terengganu',
    paramValue: 'Terengganu',
    chartBackgroundColor: 'rgba(182,226,161,0.5)',
    chartBorderColor: 'rgb(182, 226, 161)',
  },
  {
    id: 14,
    displayName: 'W.P. Kuala Lumpur',
    paramValue: 'W.P. Kuala Lumpur',
    chartBackgroundColor: 'rgba(157,60,114,0.5)',
    chartBorderColor: 'rgb(157, 60, 114)',
  },
];
