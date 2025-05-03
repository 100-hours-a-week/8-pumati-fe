import { Button } from '@/components';
import { KakaoIcon, LogoIcon } from '@/components/icons';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 h-[calc(100vh-4rem)]">
      <h1>
        <Link href="/">
          <LogoIcon width={120} />
        </Link>
      </h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <Button
          variant="kakao"
          size="lg"
          icon={<KakaoIcon width={20} height={20} />}
        >
          카카오 로그인
        </Button>
        <Link
          href="/signup"
          className="text-sm text-grey hover:text-blue transition-all duration-150 hover:underline hover:underline-offset-4"
        >
          회원가입하러 가기
        </Link>
      </div>
    </section>
  );
}
