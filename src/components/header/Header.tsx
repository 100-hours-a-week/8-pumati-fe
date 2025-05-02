'use client';

import { drawerAtom } from '@/store';
import { cn } from '@/utils/style';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRef } from 'react';
import { Drawer } from '../drawer';
import { CancelIcon, LogoIcon, MenuIcon } from '../icons';
import { NavMenuList } from './NavMenuList';

export function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(drawerAtom);

  const handleSidebarToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <section className="relative">
      <header
        className={cn(
          'sticky top-0 z-40 flex justify-between items-center px-8 py-4 h-16 bg-white transition-all duration-200 ease-in-out border-b border-soft-grey',
          isDrawerOpen && 'border-b-white',
        )}
      >
        <Link href="/">
          <LogoIcon width={92} />
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="cursor-pointer"
          onClick={handleSidebarToggle}
        >
          {isDrawerOpen ? (
            <CancelIcon width={18} height={18} fill="var(--color-dark-grey)" />
          ) : (
            <MenuIcon width={24} height={24} fill="var(--color-dark-grey)" />
          )}
        </button>
      </header>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <NavMenuList />
      </Drawer>
    </section>
  );
}
