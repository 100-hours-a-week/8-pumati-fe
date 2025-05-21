import { pretendard } from '@/assets/fonts';
import { Providers } from '@/providers';
import { cn } from '@/utils/style';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '품앗이',
    template: '품앗이 | %s',
  },
  description:
    '카카오테크 부트캠프 교육생들을 위한 트래픽 품앗이 플랫폼, 품앗이는 프로젝트 홍보를 통해 교육생들이 서로의 성공을 함께 만들어가는 공간입니다.',
  keywords: [
    '카테부',
    '카카오 테크 부트캠프',
    '품앗이',
    '프로젝트 공유',
    '개발자 커뮤니티',
    '프로젝트 랭킹',
    '최신 프로젝트',
    '출석체크',
    '개발자 운세',
    '프로젝트 포트폴리오',
    '프로젝트 탐색',
  ].join(', '),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          pretendard.className,
          'min-h-screen w-full bg-blue-white',
        )}
      >
        <Providers>
          <main className="relative mx-auto min-w-[375px] max-w-[600px] w-full min-h-screen bg-white shadow-md">
            {children}
          </main>
          <div id="modal-portal" />
        </Providers>
      </body>
    </html>
  );
}
