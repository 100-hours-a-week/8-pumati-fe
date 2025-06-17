import { AUTH_QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { refresh } from '../services';

export function useRefresh() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY.REFRESH,
    queryFn: refresh,
  });
}
