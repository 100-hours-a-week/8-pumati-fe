import { AuthHeader } from '@/features/auth/components';

export default async function AuthHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      <div className="px-6 min-h-[calc(100vh-4rem)] h-full">{children}</div>
    </>
  );
}
