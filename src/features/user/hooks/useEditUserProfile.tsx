'use client';

import { USER_PATH, USER_QUERY_KEY } from '@/constants';
import { useAuth } from '@/features/auth/hooks';
import { getQueryClient } from '@/libs/tanstack-query';
import atomStore from '@/store';
import { accessTokenAtom, authAtom } from '@/store/atoms';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { UserProfileEditData } from '../schemas';
import { editUserProfile } from '../services';

export function useEditUserProfile() {
  const router = useRouter();

  const queryClient = getQueryClient();

  const accessToken = useAtomValue(accessTokenAtom);
  const setAuthData = useSetAtom(authAtom);

  const { mutateAsync: getMe } = useAuth();

  return useMutation({
    mutationFn: (data: UserProfileEditData) =>
      editUserProfile(accessToken!, data),
    onSuccess: async () => {
      const accessToken = atomStore.get(accessTokenAtom);
      const user = await getMe(accessToken!);

      setAuthData(user);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.BADGES });
      router.push(USER_PATH.MY_PAGE);
    },
    onError: (error) => {
      console.error(error);
      alert('회원정보 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
