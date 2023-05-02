import { requests } from '../api/agent';
import { YearlyVariables } from '../models/RatioResponse';
import { useQuery } from 'react-query';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useYearlyRatio = (url = 'Record/donation/yearly/ratio') => {
  return useQuery(
    [url],
    () => {
      return requests.get<YearlyVariables[]>(url);
    },
    {
      staleTime: twentyFourHoursInMs,
    }
  );
};
