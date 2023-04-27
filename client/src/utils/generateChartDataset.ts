import { states } from '../constants/states';
import { RecordResponse } from '../models/RecordResponse';

export const generateChartDataset = (apiResponse: RecordResponse) => {
  const formatedData = apiResponse.data.map((d) => {
    const date = new Date(d.date);
    const dateInMsWithoutOffset =
      date.getTime() + date.getTimezoneOffset() * 60 * 1000;

    return {
      x: dateInMsWithoutOffset,
      y: d.value,
    };
  });

  return {
    label: apiResponse.metaData.state,
    data: formatedData,
    backgroundColor:
      states.find((s) => s.paramValue === apiResponse.metaData.state)
        ?.chartBackgroundColor || 'rgba(0,0,0,0.5)',
    borderColor:
      states.find((state) => state.paramValue === apiResponse.metaData.state)
        ?.chartBorderColor || 'rgb(0,0,0)',
    borderWidth: 1,
  };
};
