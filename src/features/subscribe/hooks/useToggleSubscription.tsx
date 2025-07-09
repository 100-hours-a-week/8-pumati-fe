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
    onMutate: async ({ projectId, isSubscribed }) => {
      await queryClient.cancelQueries({
        queryKey: PROJECT_QUERY_KEY.CHECK_SUBSCRIPTION(projectId),
      });

      const prevSubscribedState = queryClient.getQueryData(
        PROJECT_QUERY_KEY.CHECK_SUBSCRIPTION(projectId),
      );

      queryClient.setQueryData(
        PROJECT_QUERY_KEY.CHECK_SUBSCRIPTION(projectId),
        { isSubscribed: !isSubscribed },
      );

      return { prevSubscribedState };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.SUBSCRIPTION_DATA,
      });
    },
    onError: (error, variables, context) => {
      console.log('Failed to toggle subscription with error', error);
      alert('구독 또는 구독 취소에 실패했습니다.');

      queryClient.setQueryData(
        PROJECT_QUERY_KEY.CHECK_SUBSCRIPTION(variables.projectId),
        context?.prevSubscribedState,
      );
    },
  });
}
