'use client';

import { Button } from '@/components';
import { KakaoIcon, LogoIcon } from '@/components/icons';
import { loginWithProvider } from '@/features/auth/services';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 h-[calc(100vh-4rem)]">
      <h1>
        <Link href="/">
          <LogoIcon width={120} />
        </Link>
      </h1>
      <Button
        variant="kakao"
        size="lg"
        icon={<KakaoIcon width={20} height={20} />}
        onClick={() => loginWithProvider('kakao')}
      >
        카카오 로그인
      </Button>
    </section>
  );
}
