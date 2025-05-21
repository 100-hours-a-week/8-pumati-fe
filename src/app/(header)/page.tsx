import { LatestProjects, RankedProjects } from '@/features/project/components';
import { Attendance } from '@/features/user/components/attendance';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '프로젝트 공유 플랫폼',
  description:
    '품앗이 상위 프로젝트와 최신 프로젝트를 확인하고, 출석체크를 통해 오늘의 개발자 운세를 받아보세요. 품앗이에서 다양한 프로젝트를 탐색하고 공유하세요.',
};

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 pb-15">
      <RankedProjects />
      <Attendance />
      <LatestProjects />
    </section>
  );
}
