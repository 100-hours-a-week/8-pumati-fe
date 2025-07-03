'use client';

import {
  useCloseOnEscape,
  useLockOutsideScroll,
  useOutsideClick,
} from '@/hooks';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../button';

type AlertModalProps = {
  children: ReactNode;
  title: string;
  buttonText: string;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
};

export function AlertModal({
  children,
  title,
  buttonText,
  onClose,
  onConfirm,
  isLoading,
}: AlertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(modalRef, onClose);
  useLockOutsideScroll();
  useCloseOnEscape(onClose);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    onClose();
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);
  return (
    <section className="fixed top-0 left-0 w-full h-full z-50">
      <div className="relative flex justify-center items-center mx-auto max-w-[600px] w-full min-h-screen h-full backdrop-blur-xs bg-neutral-800/30">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          ref={modalRef}
          className="relative flex flex-col items-center justify-between gap-4 px-4 pt-4 pb-8 w-4/5 min-h-[200px] max-h-4/5 bg-white rounded-lg overflow-auto"
        >
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
          <div
            id="modal-desc"
            className="flex flex-col items-center justify-between gap-4 w-full"
          >
            {children}
          </div>
          <Button
            ref={buttonRef}
            size="md"
            onClick={handleConfirm}
            disabled={isLoading}
            name={buttonText}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
