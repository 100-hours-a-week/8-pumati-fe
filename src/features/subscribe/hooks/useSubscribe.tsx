'use client';

import { PROJECT_QUERY_KEY } from '@/constants';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { subscribe } from '../services';

export function useSubscribe() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.SUBSCRIPTION_DATA,
      });
    },
  });
}
