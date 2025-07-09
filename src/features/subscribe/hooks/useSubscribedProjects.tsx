'use client';

import { PROJECT_QUERY_KEY } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Term } from '../components';
import { getSubscribedProjects } from '../services';

export function useSubscribedProjects(term: Term, pageSize: number = 12) {
  const accessToken = useAtomValue(accessTokenAtom);

  return useSuspenseInfiniteQuery({
    queryKey: PROJECT_QUERY_KEY.SUBSCRIBED_PROJECTS(term),
    queryFn: ({ pageParam }) =>
      getSubscribedProjects(
        term,
        accessToken as string,
        pageParam.nextCursorTime,
        pageParam.nextCursorId,
        pageSize,
      ),
    initialPageParam: {
      nextCursorId: 0,
      nextCursorTime: null as string | null,
    },
    getNextPageParam: (lastPage) => {
      if (
        lastPage.meta.nextCursorId === null &&
        lastPage.meta.nextCursorTime === null
      ) {
        return null;
      }

      return {
        nextCursorId: lastPage.meta.nextCursorId,
        nextCursorTime: lastPage.meta.nextCursorTime,
      };
    },
  });
}
