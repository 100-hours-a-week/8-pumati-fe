import { BadgeFetcher } from '@/features/badge/components';
import { DashboardFetcher, Information } from '@/features/user/components';
import { Suspense } from 'react';

export default async function MyPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">마이페이지</h1>
      <Information />
      <div className="mb-12 w-full">
        <DashboardFetcher />
      </div>
      <div className="mb-12 w-full">
        <Suspense>
          <BadgeFetcher />
        </Suspense>
      </div>
    </>
  );
}
