'use client';

import { PROJECT_PATH } from '@/constants';
import { abbreviateCountToK } from '@/utils/count';
import Link from 'next/link';
import { Badge as BadgeType } from '../../schemas';
import { Badge } from '../badge/Badge';

type BadgeItemProps = {
  badge: BadgeType;
};

export function BadgeItem({ badge }: BadgeItemProps) {
  const { badgeImageUrl, teamNumber, acquiredCount, projectId } = badge;

  return (
    <li className="flex flex-col items-center gap-2">
      <Link
        href={PROJECT_PATH.DETAIL(projectId.toString())}
        className="relative group cursor-pointer"
      >
        <Badge imageUrl={badgeImageUrl} size="lg" />
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black/50 z-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white font-semibold">{teamNumber}팀</p>
        </div>
      </Link>
      <p className="text-sm text-dark-grey">
        x {abbreviateCountToK(acquiredCount)}
      </p>
    </li>
  );
}
