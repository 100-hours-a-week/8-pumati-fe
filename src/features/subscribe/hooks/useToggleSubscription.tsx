'use client';

import { PROJECT_QUERY_KEY } from '@/constants';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { subscribe, unSubscribe } from '../services';

export function useToggleSubscription() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      isSubscribed,
      token,
    }: {
      projectId: number;
      isSubscribed: boolean;
      token: string;
    }) => {
      const request = isSubscribed ? unSubscribe : subscribe;

      return request({ projectId, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.SUBSCRIPTION_DATA,
      });
    },
  });
}
