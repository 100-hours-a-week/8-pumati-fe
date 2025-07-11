'use client';

import { PROJECT_QUERY_KEY } from '@/constants';
import { accessTokenAtom } from '@/store/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { checkProjectExists } from '../services';

export function useCheckProjectExists() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: PROJECT_QUERY_KEY.CHECK_PROJECT_EXISTS,
    queryFn: () => checkProjectExists(accessToken ?? ''),
    gcTime: 0,
  });
}
