'use client';

import { NavArrowIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <header className="sticky top-0 flex justify-center items-center px-6 py-4 w-full h-16 border-b border-soft-grey bg-white z-40">
      <button
        onClick={handleBack}
        className="absolute left-6 cursor-pointer"
        aria-label="뒤로가기"
      >
        <NavArrowIcon
          width={24}
          height={24}
          fill="var(--color-dark-grey)"
          className="-rotate-90"
        />
      </button>
      <h1 className="text-lg font-semibold flex-1 text-center">{title}</h1>
    </header>
  );
}
