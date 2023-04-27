export type Data = {
  date: string;
  value: number;
};

export type MetaData = {
  attribute: string;
  interval: string;
  state: string;
};

export type RecordResponse = {
  data: Data[];
  metaData: MetaData;
};
