'use client';

import { Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function ProjectEditPage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-6 min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 수정</h1>
      <p className="text-dark-grey">해당 페이지는 현재 준비 중입니다.</p>
      <Button size="md" onClick={() => router.back()}>
        돌아가기
      </Button>
    </section>
  );
}
