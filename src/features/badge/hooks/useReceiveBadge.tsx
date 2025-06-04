import { USER_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { receiveBadge } from '../services';

export function useReceiveBadge() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ teamId, token }: { teamId: number; token: string }) =>
      receiveBadge(token, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.BADGES });
    },
    onError: (error) => {
      console.error('Failed to receive badge:', error);
    },
  });
}
