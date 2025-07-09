import { BadgesContainer } from '@/features/badge/components';
import { DashboardContainer, Information } from '@/features/user/components';
import { SubscribedProjectsContainer } from '@/features/user/components/subscribed-projects/SubscribedProjectsContainer';

export default function MyPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">마이페이지</h1>
      <Information />
      <DashboardContainer />
      <SubscribedProjectsContainer />
      <BadgesContainer />
    </>
  );
}
