import { AUTH_QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { RefreshResponse } from '../schemas';
import { refresh } from '../services';

export function useRefresh() {
  return useQuery<RefreshResponse, Error>({
    queryKey: AUTH_QUERY_KEY.REFRESH,
    queryFn: refresh,
  });
}
