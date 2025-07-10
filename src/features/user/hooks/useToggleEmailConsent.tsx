'use client';

import { accessTokenAtom, authAtom } from '@/store/atoms';
import { useMutation } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { toggleEmailConsent } from '../services';

export function useToggleEmailConsent() {
  const [authData, setAuthData] = useAtom(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  return useMutation({
    mutationFn: () => toggleEmailConsent(accessToken as string),
    onMutate: () => {
      setAuthData((prev) =>
        prev ? { ...prev, hasEmailConsent: !prev.hasEmailConsent } : null,
      );

      return { prevAuthData: authData };
    },
    onError: (error, _, context) => {
      console.log('Failed to toggle email consent with error', error);
      alert('이메일 수신 동의 설정에 실패했습니다.');

      if (context?.prevAuthData) {
        setAuthData(context.prevAuthData);
      }
    },
  });
}
