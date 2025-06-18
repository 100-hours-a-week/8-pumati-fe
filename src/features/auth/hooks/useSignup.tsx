'use client';

import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { signup } from '../services';
import { NonTraineeSignupData, SignupData } from '../schemas';
import { ApiError } from '@/utils/error';

export function useSignup() {
  const router = useRouter();

  const setAccessToken = useSetAtom(accessTokenAtom);

  return useMutation({
    mutationFn: async (signupData: SignupData | NonTraineeSignupData) => {
      const data = await signup(signupData);

      if (!data) throw new ApiError(404, 'Signup failed');

      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (error) => {
      alert('회원가입에 실패했습니다. 잠시후 다시 시도해주세요.');
      router.replace(AUTH_PATH.LOGIN);
      console.error(error);
    },
  });
}
