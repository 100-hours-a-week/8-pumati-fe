import { Header } from '@/components';
import { AuthProvider } from '@/features/auth/components';
import { cookies } from 'next/headers';

export default async function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return (
    <AuthProvider refreshToken={refreshToken}>
      <Header />
      <div className="relative px-6 min-h-[calc(100vh-4rem)] h-full">
        {children}
      </div>
    </AuthProvider>
  );
}
