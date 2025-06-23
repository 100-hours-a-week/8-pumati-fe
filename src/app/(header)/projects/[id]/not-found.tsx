'use client';

import { ErrorFallback } from '@/components';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorFallback buttonText="돌아가기" onButtonClick={() => router.back()}>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue">
          요청하신 프로젝트를 찾을 수 없습니다.
        </p>
        <p className="text-dark-grey">
          입력하신 프로젝트 ID가 올바르지 않거나,
          <br />
          해당 프로젝트가 삭제되었을 수 있습니다.
        </p>
      </div>
    </ErrorFallback>
  );
}
