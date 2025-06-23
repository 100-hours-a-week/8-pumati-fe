'use client';

import { ErrorFallback } from '@/components';

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log('error: ', error);

  const handleTryAgain = () => {
    reset();
  };
  return (
    <ErrorFallback buttonText="다시 시도" onButtonClick={handleTryAgain}>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue">
          프로젝트를 불러오는 중 문제가 발생했습니다.
        </p>
        <p className="text-dark-grey">
          일시적인 오류가 발생했을 수 있습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    </ErrorFallback>
  );
}
