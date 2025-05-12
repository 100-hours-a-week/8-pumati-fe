import { LatestProjects, RankedProjects } from '@/features/project/components';
import { Attendance } from '@/features/user/components/attendance';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 pb-15">
      <RankedProjects />
      <Attendance />
      <LatestProjects />
    </section>
  );
}
