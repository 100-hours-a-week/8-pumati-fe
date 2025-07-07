'use client';

import {
  useCloseOnEscape,
  useLockOutsideScroll,
  useOutsideClick,
} from '@/hooks';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../button';

type ConfirmModalProps = {
  children: ReactNode;
  title: string;
  buttonText: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  destructive?: boolean;
};

export function ConfirmModal({
  children,
  title,
  buttonText,
  isLoading = false,
  onClose,
  onConfirm,
  destructive = false,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(modalRef, onClose);
  useLockOutsideScroll();
  useCloseOnEscape(onClose);

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
          className="flex flex-col items-center gap-4 p-4 w-11/12 xs:w-4/5 bg-white rounded-lg"
        >
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
          <div
            id="modal-desc"
            className="flex flex-col items-center gap-4 w-full"
          >
            {children}
          </div>
          <div className="flex gap-1 w-full">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              취소
            </Button>
            <Button
              ref={buttonRef}
              onClick={onConfirm}
              variant={destructive ? 'destructive' : 'primary'}
              isLoading={isLoading}
              name={buttonText}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
