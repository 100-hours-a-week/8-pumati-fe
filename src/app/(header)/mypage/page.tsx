import { BadgesContainer } from '@/features/badge/components';
import { DashboardContainer, Information } from '@/features/user/components';

export default function MyPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">마이페이지</h1>
      <Information />
      <DashboardContainer />
      <BadgesContainer />
    </>
  );
}
