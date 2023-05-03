import { requests } from '../api/agent';
import { LatestStatsResponse } from '../models/LatestStatsResponse';
import { useQuery } from 'react-query';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useLatestStats = (url = 'Record/donation/lateststats') => {
  return useQuery(
    [url],
    () => {
      return requests.get<LatestStatsResponse>(url);
    },
    {
      staleTime: twentyFourHoursInMs,
    }
  );
};
