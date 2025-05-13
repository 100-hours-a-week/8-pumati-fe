'use client';

import { PROJECT_PATH } from '@/constants';
import { CreateForm } from '@/features/project/components';
import { useCheckProjectExists } from '@/features/project/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewProjectPage() {
  const router = useRouter();
  const { data: projectExists, error } = useCheckProjectExists();

  useEffect(() => {
    if (projectExists && projectExists.exists) {
      alert('프로젝트는 팀당 한 개만 작성할 수 있습니다.');
      router.replace(PROJECT_PATH.ROOT);
      return;
    }

    if (error) {
      alert('교육생만 프로젝트를 작성할 수 있습니다.');
      router.replace(PROJECT_PATH.ROOT);
      return;
    }
  }, [projectExists, router, error]);
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 생성</h1>
      <CreateForm />
    </section>
  );
}
