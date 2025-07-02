export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[25rem]">
        {children}
      </div>
    </section>
  );
}
