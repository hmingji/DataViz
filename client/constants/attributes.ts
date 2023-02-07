export type RecordCategory = 'donation' | 'newdonor';

export type Attribute = {
  id: number;
  displayName: string;
  pathName: string;
  category: RecordCategory;
};

//TODO: create mapping object for path
export const attributes: Attribute[] = [
  { id: 1, displayName: 'Daily', pathName: 'daily', category: 'donation' },
  { id: 2, displayName: 'Blood A', pathName: 'blood_a', category: 'donation' },
  { id: 3, displayName: 'Blood B', pathName: 'blood_b', category: 'donation' },
  { id: 4, displayName: 'Blood O', pathName: 'blood_o', category: 'donation' },
  {
    id: 5,
    displayName: 'Blood AB',
    pathName: 'blood_ab',
    category: 'donation',
  },
  {
    id: 6,
    displayName: 'Location Centre',
    pathName: 'location_centre',
    category: 'donation',
  },
  {
    id: 7,
    displayName: 'Location Mobile',
    pathName: 'location_mobile',
    category: 'donation',
  },
  {
    id: 8,
    displayName: 'Type Whole Blood',
    pathName: 'type_wholeblood',
    category: 'donation',
  },
  {
    id: 9,
    displayName: 'Type Apheresis Platelet',
    pathName: 'type_apheresisplatelet',
    category: 'donation',
  },
  {
    id: 10,
    displayName: 'Type Apheresis Plasma',
    pathName: 'type_apheresisplasma',
    category: 'donation',
  },
  {
    id: 11,
    displayName: 'Type Other',
    pathName: 'type_other',
    category: 'donation',
  },
  {
    id: 12,
    displayName: 'Social Civilian',
    pathName: 'social_civilian',
    category: 'donation',
  },
  {
    id: 13,
    displayName: 'Social Student',
    pathName: 'social_student',
    category: 'donation',
  },
  {
    id: 14,
    displayName: 'Social Police Army',
    pathName: 'social_policearmy',
    category: 'donation',
  },
  {
    id: 15,
    displayName: 'Donor New',
    pathName: 'donor_new',
    category: 'donation',
  },
  {
    id: 16,
    displayName: 'Donor Regular',
    pathName: 'donor_regular',
    category: 'donation',
  },
  {
    id: 17,
    displayName: 'Donor Irregular',
    pathName: 'donor_irregular',
    category: 'donation',
  },
  {
    id: 18,
    displayName: 'Age Group 17-24',
    pathName: 'agegroup17_24',
    category: 'newdonor',
  },
  {
    id: 19,
    displayName: 'Age Group 25-29',
    pathName: 'agegroup25_29',
    category: 'newdonor',
  },
  {
    id: 20,
    displayName: 'Age Group 30-34',
    pathName: 'agegroup30_34',
    category: 'newdonor',
  },
  {
    id: 21,
    displayName: 'Age Group 35-39',
    pathName: 'agegroup35_39',
    category: 'newdonor',
  },
  {
    id: 22,
    displayName: 'Age Group 40-44',
    pathName: 'agegroup40_44',
    category: 'newdonor',
  },
  {
    id: 23,
    displayName: 'Age Group 45-49',
    pathName: 'agegroup45_49',
    category: 'newdonor',
  },
  {
    id: 24,
    displayName: 'Age Group 50-54',
    pathName: 'agegroup50_54',
    category: 'newdonor',
  },
  {
    id: 25,
    displayName: 'Age Group 55-59',
    pathName: 'agegroup55_59',
    category: 'newdonor',
  },
  {
    id: 26,
    displayName: 'Age Group 60-64',
    pathName: 'agegroup60_64',
    category: 'newdonor',
  },
  {
    id: 27,
    displayName: 'Age Group Other',
    pathName: 'agegroupother',
    category: 'newdonor',
  },
  { id: 28, displayName: 'Total', pathName: 'total', category: 'newdonor' },
];

export const defaultAttribute = {
  donation: attributes.find((a) => a.displayName === 'Daily'),
  newdonor: attributes.find((a) => a.displayName === 'Total'),
};
