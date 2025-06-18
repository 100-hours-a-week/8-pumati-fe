'use client';

import { useLockOutsideScroll, useOutsideClick } from '@/hooks';
import { ReactNode, useRef } from 'react';
import { Button } from '../button';

type AlertModalProps = {
  children: ReactNode;
  buttonText: string;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
};

export function AlertModal({
  children,
  buttonText,
  onClose,
  onConfirm,
  isLoading,
}: AlertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);
  useLockOutsideScroll();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    onClose();
  };
  return (
    <section className="fixed top-0 left-0 w-full h-full z-50">
      <div className="relative flex justify-center items-center mx-auto max-w-[600px] w-full min-h-screen h-full backdrop-blur-xs bg-neutral-800/30">
        <div
          ref={modalRef}
          className="relative flex flex-col items-center justify-between gap-4 px-4 pt-4 pb-8 w-4/5 min-h-[200px] max-h-4/5 bg-white rounded-lg overflow-auto"
        >
          {children}
          <Button size="md" onClick={handleConfirm} disabled={isLoading}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
