import { LogoIcon } from '@/components/icons';
import { LoginButton } from '@/features/auth/components';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '로그인',
  description:
    '품앗이 로그인 페이지입니다. 품앗이에 로그인하고 프로젝트를 공유하세요.',
};

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 h-[calc(100vh-4rem)]">
      <h1>
        <Link href="/">
          <LogoIcon width={120} />
        </Link>
      </h1>
      <LoginButton />
    </section>
  );
}
