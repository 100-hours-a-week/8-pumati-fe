'use client';

import { useRouter } from 'next/navigation';

import { PROJECT_PATH } from '@/constants';

export default function BrowseSubscribedProjectsButton() {
  const router = useRouter();

  const handleBrowseSubscribedProjectsClick = () => {
    router.push(PROJECT_PATH.SUBSCRIPTION);
  };
  return (
    <button
      className="text-sm text-blue cursor-pointer hover:underline"
      onClick={handleBrowseSubscribedProjectsClick}
    >
      구독 프로젝트 보러가기
    </button>
  );
}
