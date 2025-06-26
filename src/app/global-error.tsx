'use client';

import matiImg from '@/assets/images/mati-chatbot.png';
import { Button } from '@/components';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log('error: ', error);

  const handleTryAgain = () => {
    reset();
  };
  return (
    <html>
      <body className="min-h-screen w-full bg-blue-white m-0 p-0">
        <div className="min-h-screen flex flex-col justify-center items-center gap-6 text-center p-6">
          <Image src={matiImg} alt="chatbot" width={100} height={100} />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-blue">
              예상치 못한 오류가 발생했습니다.
            </p>
            <p className="text-dark-grey">
              일시적인 오류가 발생했을 수 있습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>
          </div>
          <div className="w-full max-w-[25rem] mt-6">
            <Button type="button" size="md" onClick={handleTryAgain}>
              다시 시도
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
