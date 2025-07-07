'use client';

import { Badge } from '@/features/badge/components';
import { authAtom } from '@/store/atoms';
import { cn } from '@/utils/style';
import { useAtomValue } from 'jotai';
import { Team } from '../../schemas';
import { DashboardItem } from './DashboardItem';

type DashboardProps = {
  dashboard: Team;
};

export function Dashboard({ dashboard }: DashboardProps) {
  const {
    id,
    projectId,
    badgeImageUrl,
    givedPumatiCount,
    receivedPumatiCount,
    rank,
  } = dashboard;

  const authData = useAtomValue(authAtom);

  const isMyProject = authData?.teamId === id;

  const dashboardItems = [
    {
      title: '뱃지',
      item: (
        <Badge
          imageUrl={badgeImageUrl}
          isExpandable
          priority
          projectId={projectId}
          isMyProject={isMyProject}
        />
      ),
      itemStyle: 'bg-light-blue border-blue',
    },
    {
      title: '품앗이 등수',
      item: <DashboardItem value={rank} unit="등" textColor="text-green" />,
      itemStyle: 'bg-light-green border-green',
    },
    {
      title: '준 품앗이',
      item: (
        <DashboardItem
          value={givedPumatiCount}
          unit="번"
          textColor="text-mint"
        />
      ),
      itemStyle: 'bg-light-mint border-mint',
    },
    {
      title: '받은 품앗이',
      item: (
        <DashboardItem
          value={receivedPumatiCount}
          unit="번"
          textColor="text-red"
        />
      ),
      itemStyle: 'bg-light-red border-red',
    },
  ];
  return (
    <ul className="grid grid-cols-2 gap-2 w-full">
      {dashboardItems.map(({ title, item, itemStyle }) => (
        <li
          key={itemStyle}
          className={cn(
            'flex flex-col items-center px-4 py-3 border rounded-xl h-28',
            itemStyle,
          )}
        >
          <p className="self-start font-semibold">{title}</p>
          <div className="flex justify-center items-center h-full">{item}</div>
        </li>
      ))}
    </ul>
  );
}
