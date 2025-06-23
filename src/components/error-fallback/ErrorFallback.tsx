'use client';

import matiImg from '@/assets/images/mati-chatbot.png';
import { ROOT_PATH } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '../button';

type ErrorFallbackProps = {
  children: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
};

export function ErrorFallback({
  children,
  buttonText,
  onButtonClick,
}: ErrorFallbackProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 text-center p-6">
      <Image src={matiImg} alt="chatbot" width={100} height={100} />
      {children}
      <div className="flex w-full max-w-[25rem] gap-2 mt-6">
        <Button variant="outline" onClick={() => router.replace(ROOT_PATH)}>
          홈으로
        </Button>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
}
