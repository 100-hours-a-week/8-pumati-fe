'use client';

import { SpinnerIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom, signupTokenAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMe } from '../../hooks';

export function LoginCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const setSignupToken = useSetAtom(signupTokenAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);

  const { mutate: getMe } = useMe();

  useEffect(() => {
    if (message === 'additionalInfoRequired') {
      setSignupToken(searchParams.get('signupToken'));
      router.push(AUTH_PATH.SIGN_UP);
    } else if (message === 'loginSuccess') {
      const accessToken = searchParams.get('accessToken') as string;

      setAccessToken(accessToken);
      getMe(accessToken);
    } else {
      // 로그인 실패 처리 Toast
      router.push(AUTH_PATH.LOGIN);
    }
  }, [message, getMe, router, searchParams, setAccessToken, setSignupToken]);
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <SpinnerIcon
        width={32}
        height={32}
        fill="var(--color-blue)"
        className="animate-spin"
      />
    </section>
  );
}
