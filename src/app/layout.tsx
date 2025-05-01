import { pretendard } from '@/assets/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pumati',
  description:
    '카카오테크 부트캠프 교육생들을 위한 트래픽 품앗이 플랫폼, pumati는 프로젝트 홍보를 통해 교육생들이 서로의 성공을 함께 만들어가는 공간입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <div className="flex min-h-screen w-full bg-blue-white">
          <main className="mx-auto min-w-[375px] max-w-[600px] w-full min-h-screen bg-white shadow-sm overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
