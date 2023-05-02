import { requests } from '../api/agent';
import { Variable } from '../models/RatioResponse';
import { useQuery } from 'react-query';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
export type RecentQueryInterval = 'month' | 'year';
export const useRecentRatio = (url: string, interval: RecentQueryInterval) => {
  return useQuery(
    [url, interval],
    () => {
      const params = new URLSearchParams();
      params.append('interval', interval);
      return requests.get<Variable[]>(url, params);
    },
    {
      staleTime: twentyFourHoursInMs,
    }
  );
};
