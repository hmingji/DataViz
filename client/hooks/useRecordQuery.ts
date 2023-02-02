import { requests } from '@/api/agent';
import { RecordResponse } from '@/models/RecordResponse';
import { useQuery } from 'react-query';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useRecordQuery = (url: string, state: string) => {
  const params = new URLSearchParams();
  params.append('State', state);
  return useQuery<RecordResponse, Error>(
    [url, state],
    () => requests.get<RecordResponse>(url, params),
    {
      staleTime: twentyFourHoursInMs,
    }
  );
};
