'use client';

import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { logout } from '../services';

export function useLogout() {
  const setAccessToken = useSetAtom(accessTokenAtom);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
