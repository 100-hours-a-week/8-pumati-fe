'use client';

import { ROOT_PATH } from '@/constants';
import { MyData } from '@/features/user/schemas';
import { authAtom } from '@/store/atoms/user';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { getMe } from '../services';

export function useMe() {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  return useMutation<MyData, Error, string>({
    mutationFn: getMe,
    onSuccess: ({ id, email, name, profileImageUrl, teamId }) => {
      setAuth({
        id,
        email,
        name,
        profileImageUrl,
        teamId,
      });
      router.push(ROOT_PATH);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
