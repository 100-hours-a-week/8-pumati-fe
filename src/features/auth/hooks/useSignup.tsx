import { ROOT_PATH } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signup } from '../services';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push(ROOT_PATH);
    },
    onError: (error) => {
      // 회원가입 실패 처리 Toast
      console.error(error);
    },
  });
}
