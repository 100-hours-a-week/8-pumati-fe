import { useOutsideClick } from '@/hooks';
import { navbarAtom } from '@/store';
import { cn } from '@/utils/style';
import { useAtom } from 'jotai';
import { RefObject, useRef } from 'react';
import { NavMenuItem } from './NavMenuItem';
import { MENU_HEIGHT, MENU_LIST } from './menu';

type NavbarProps = {
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function NavBar({ triggerRef }: NavbarProps) {
  const navbarRef = useRef<HTMLElement>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useAtom(navbarAtom);

  const refs = triggerRef ? [navbarRef, triggerRef] : navbarRef;

  useOutsideClick(refs, () => {
    if (isNavbarOpen) setIsNavbarOpen(false);
  });
  return (
    <nav
      ref={navbarRef}
      className={cn(
        'px-8 bg-white transition-all duration-200 ease-in-out z-40',
        isNavbarOpen ? 'pb-4 border-b border-soft-grey' : 'h-0 overflow-hidden',
      )}
      style={{ height: isNavbarOpen ? MENU_HEIGHT : '0' }}
    >
      <ul>
        {MENU_LIST.map((menu) => (
          <NavMenuItem key={menu.href} label={menu.label} href={menu.href} />
        ))}
      </ul>
    </nav>
  );
}
