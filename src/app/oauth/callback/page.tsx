'use client';

import { SpinnerIcon } from '@/components/icons';
import { AUTH_PATH, ROOT_PATH } from '@/constants';
import { signupTokenAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const setSignupToken = useSetAtom(signupTokenAtom);

  useEffect(() => {
    if (message === 'additionalInfoRequired') {
      setSignupToken(searchParams.get('signupToken'));
      router.push(AUTH_PATH.SIGN_UP);
    } else if (message === 'loginSuccess') {
      router.push(ROOT_PATH);
    } else {
      // 로그인 실패 처리 Toast
      router.push(AUTH_PATH.LOGIN);
    }
  }, [message]);

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
