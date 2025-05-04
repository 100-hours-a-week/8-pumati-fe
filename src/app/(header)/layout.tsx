import { Header } from '@/components';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="px-6 min-h-[calc(100vh-4rem)] h-full">{children}</div>
    </>
  );
}
