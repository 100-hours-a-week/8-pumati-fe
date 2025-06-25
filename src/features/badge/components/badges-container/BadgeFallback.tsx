import { SpinnerIcon } from '@/components/icons';

export function BadgeFallback() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="self-start text-lg font-semibold">받은 품앗이 뱃지</h2>
      <div className="flex items-center justify-center bg-blue-white rounded-xl h-52">
        <SpinnerIcon
          width={24}
          height={24}
          className="mx-auto animate-spin"
          fill="var(--color-blue)"
        />
      </div>
    </section>
  );
}
