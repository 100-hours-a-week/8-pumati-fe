'use client';

import { PROJECT_QUERY_KEY } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { checkSubscription } from '../services';

export function useCheckSubscriptionState(projectId: number) {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: PROJECT_QUERY_KEY.CHECK_SUBSCRIPTION(projectId),
    queryFn: () =>
      checkSubscription({
        projectId,
        token: accessToken as string,
      }),
    enabled: !!accessToken,
  });
}
