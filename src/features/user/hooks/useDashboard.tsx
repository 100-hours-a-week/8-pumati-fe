import { USER_QUERY_KEY } from '@/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboard } from '../services';

export function useDashboard(teamId?: number | null) {
  return useSuspenseQuery({
    queryKey: USER_QUERY_KEY.DASHBOARD(teamId!),
    queryFn: () => getDashboard(teamId!),
  });
}
