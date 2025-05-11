import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { signup } from '../services';

export function useSignup() {
  const setAccessToken = useSetAtom(accessTokenAtom);

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (error) => {
      // 회원가입 실패 처리 Toast
      console.error(error);
    },
  });
}
