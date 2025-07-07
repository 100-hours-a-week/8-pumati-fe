'use client';

import { PROJECT_PATH, ROOT_PATH, USER_PATH } from '@/constants';
import { navbarAtom } from '@/store/atoms';
import { cn } from '@/utils/style';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { CancelIcon, LogoIcon, MenuIcon, NavArrowIcon } from '../icons';
import { NavBar } from './NavBar';

const NO_BACK_BUTTON_PATHS = [ROOT_PATH, PROJECT_PATH.ROOT, USER_PATH.MY_PAGE];

export function MenuHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isNavbarOpen, setIsNavbarOpen] = useAtom(navbarAtom);
  return (
    <header className="sticky top-0 w-full bg-white overflow-hidden z-40">
      <section
        className={cn(
          'flex justify-between items-center z-40 px-6 py-4 h-16 border-b border-soft-grey',
          isNavbarOpen
            ? 'border-b-white'
            : 'transition-colors duration-300 ease-in-out',
        )}
      >
        <div className="w-6 h-6">
          {!NO_BACK_BUTTON_PATHS.includes(pathname) && (
            <button
              aria-label="뒤로가기"
              onClick={() => router.back()}
              className="cursor-pointer"
            >
              <NavArrowIcon
                width={24}
                height={24}
                fill="var(--color-dark-grey)"
                className="-rotate-90"
              />
            </button>
          )}
        </div>
        <Link href="/" aria-label="홈으로 이동">
          <LogoIcon width={92} />
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="cursor-pointer w-6 h-6"
          aria-label={isNavbarOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isNavbarOpen}
          aria-controls="navbar-menu"
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        >
          {isNavbarOpen ? (
            <CancelIcon width={18} height={18} fill="var(--color-dark-grey)" />
          ) : (
            <MenuIcon width={24} height={24} fill="var(--color-dark-grey)" />
          )}
        </button>
      </section>
      <NavBar triggerRef={buttonRef} />
    </header>
  );
}
