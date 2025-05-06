'use client';

import { CallToAction } from '@/components';
import { useRouter } from 'next/navigation';

export function ProjectsContainer() {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-4 my-10">
      <CallToAction
        text="프로젝트를 생성해보세요!"
        buttonText="생성하기"
        action={() => router.push('/projects/new')}
      />
    </section>
  );
}
