'use client';

import { useOutsideClick } from '@/hooks';
import { cn } from '@/utils/style';
import { ReactNode, RefObject, useRef } from 'react';

type DrawerProps = {
  triggerRef?: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ triggerRef, isOpen, onClose, children }: DrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const refs = triggerRef ? [drawerRef, triggerRef] : drawerRef;

  useOutsideClick(refs, () => {
    if (isOpen) onClose();
  });

  return (
    <aside
      ref={drawerRef}
      className={cn(
        'absolute bottom-0 left-0 right-0 mx-auto z-30 transition-transform duration-200 ease-in-out',
        isOpen ? 'translate-y-full' : 'translate-y-0',
      )}
    >
      {children}
    </aside>
  );
}
