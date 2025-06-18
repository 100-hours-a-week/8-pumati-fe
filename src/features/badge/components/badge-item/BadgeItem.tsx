'use client';

import { PROJECT_PATH } from '@/constants';
import { abbreviateCountToK } from '@/utils/count';
import { useRouter } from 'next/navigation';
import { Badge as BadgeType } from '../../schemas';
import { Badge } from '../badge/Badge';

type BadgeItemProps = {
  badge: BadgeType;
};

export function BadgeItem({ badge }: BadgeItemProps) {
  const { badgeImageUrl, giverTeamNumber, acquiredCount, projectId } = badge;

  const router = useRouter();

  const handleBadgeClick = () => {
    if (projectId) {
      router.push(PROJECT_PATH.DETAIL(projectId.toString()));
    } else {
      alert('죄송합니다. 현재 존재하지 않는 프로젝트입니다.');
    }
  };
  return (
    <li className="flex flex-col items-center gap-2">
      <div className="relative group cursor-pointer" onClick={handleBadgeClick}>
        <Badge imageUrl={badgeImageUrl} size="lg" />
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black/50 z-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white font-semibold">{giverTeamNumber}팀</p>
        </div>
      </div>
      <p className="text-sm text-dark-grey">
        x {abbreviateCountToK(acquiredCount)}
      </p>
    </li>
  );
}
