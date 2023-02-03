import { requests } from '@/api/agent';
import { State } from '@/constants/states';
import { RecordResponse } from '@/models/RecordResponse';
import { useQueries, useQuery } from 'react-query';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useRecordQuery = (url: string, states: State[]) => {
  //params.append('State', state);
  return useQueries(
    states.map((state) => {
      const params = new URLSearchParams();
      params.append('State', state.paramValue);
      return {
        queryKey: [url, state.paramValue],
        queryFn: () => requests.get<RecordResponse>(url, params),
      };
    })
  );
};
