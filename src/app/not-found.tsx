'use client';

import { ErrorFallback } from '@/components';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorFallback buttonText="돌아가기" onButtonClick={() => router.back()}>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue">
          현재 페이지를 찾을 수 없습니다.
        </p>
        <p className="text-dark-grey">
          페이지의 주소가 잘못 입력되었거나,
          <br />
          요청하신 페이지의 주소가 변경 또는 삭제되어 찾을 수 없습니다.
        </p>
      </div>
    </ErrorFallback>
  );
}
