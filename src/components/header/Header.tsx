'use client';

import { sidebarAtom } from '@/store';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { CancelIcon, LogoIcon, MenuIcon } from '../icons';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <header className="flex justify-between items-center px-8 py-4 h-16 border-b border-soft-grey">
      <Link href="/">
        <LogoIcon width={92} />
      </Link>
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleSidebarToggle}
      >
        {isSidebarOpen ? (
          <CancelIcon width={18} height={18} fill="var(--color-dark-grey)" />
        ) : (
          <MenuIcon width={24} height={24} fill="var(--color-dark-grey)" />
        )}
      </button>
    </header>
  );
}
