'use client';

import { useOutsideClick } from '@/hooks';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../button';

type ConfirmModalProps = {
  children: ReactNode;
  buttonText: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export function ConfirmModal({
  children,
  buttonText,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <section className="fixed top-0 left-0 w-full h-full z-50">
      <div className="relative flex justify-center items-center mx-auto max-w-[600px] w-full min-h-screen h-full backdrop-blur-xs bg-neutral-800/30">
        <div
          ref={modalRef}
          className="flex flex-col items-center gap-4 p-4 w-4/5 bg-white rounded-lg"
        >
          {children}
          <Button size="md" onClick={handleConfirm}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
