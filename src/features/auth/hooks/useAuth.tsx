'use client';

import { authAtom } from '@/store/atoms';
import { ApiError } from '@/utils/error';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMe } from '../services';

export function useAuth() {
  const setAuth = useSetAtom(authAtom);

  return useMutation({
    mutationFn: async (token: string) => {
      const data = await getMe(token);

      if (!data) throw new ApiError(404, 'User not found');

      return data;
    },
    onSuccess: setAuth,
    onError: (error) => {
      console.error(error);
    },
  });
}
