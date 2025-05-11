'use client';

import { accessTokenAtom, authAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { logout } from '../services';

export function useLogout() {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setAuth = useSetAtom(authAtom);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      setAuth(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
