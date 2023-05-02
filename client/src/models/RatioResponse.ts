export type Variable = {
  name: string;
  items: ItemValue[];
};

export type ItemValue = {
  name: string;
  value: number;
};

export type YearlyVariables = {
  year: number;
  variables: Variable[];
};
