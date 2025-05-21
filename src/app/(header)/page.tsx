import { METADATA } from '@/constants';
import { LatestProjects, RankedProjects } from '@/features/project/components';
import { Attendance } from '@/features/user/components/attendance';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = METADATA.ROOT;

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 pb-15">
      <RankedProjects />
      <Attendance />
      <LatestProjects />
    </section>
  );
}
