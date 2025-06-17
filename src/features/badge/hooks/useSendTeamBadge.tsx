import { USER_QUERY_KEY } from '@/constants';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { sendTeamBadge } from '../services';

export function useSendTeamBadge() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      receiverTeamId,
      token,
    }: {
      receiverTeamId: number;
      token: string;
    }) => sendTeamBadge(token, receiverTeamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.BADGES });
    },
    onError: (error) => {
      console.error('Failed to receive badge:', error);
    },
  });
}
