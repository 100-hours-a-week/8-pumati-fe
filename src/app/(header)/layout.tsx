import { Header } from '@/components';

export default async function AuthHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="로그인 및 회원가입" />
      <div className="px-6 min-h-[calc(100vh-4rem)] h-full">{children}</div>
    </>
  );
}
