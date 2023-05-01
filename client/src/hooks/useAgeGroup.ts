import { requests } from '../api/agent';
import { AgeGroupResponse } from '../models/AgeGroupResponse';
import { useQuery } from 'react-query';
import { RecentQueryInterval } from './useRecentRatio';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useAgeGroup = (url: string, interval: RecentQueryInterval) => {
  return useQuery(
    [url, interval],
    () => {
      const params = new URLSearchParams();
      params.append('interval', interval);
      return requests.get<AgeGroupResponse>(url, params);
    },
    {
      staleTime: twentyFourHoursInMs,
    }
  );
};
