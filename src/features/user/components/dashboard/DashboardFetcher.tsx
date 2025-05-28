'use client';

import { authAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useDashboard } from '../../hooks';
import { Dashboard } from './Dashboard';
import { DashboardFallback } from './DashboardFallback';

export function DashboardFetcher() {
  const authData = useAtomValue(authAtom);
  const { data: dashboard, isLoading } = useDashboard(authData?.teamId);

  if (!authData) {
    // 에러 throw 하고 에러바운더리로 처리
    return null;
  }
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-semibold">대시보드</h2>
        <button className="text-sm text-blue cursor-pointer hover:underline">
          프로젝트 보러가기
        </button>
      </div>
      {isLoading ? <DashboardFallback /> : <Dashboard dashboard={dashboard} />}
    </section>
  );
}
