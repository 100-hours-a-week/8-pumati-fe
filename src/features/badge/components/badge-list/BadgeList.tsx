'use client';

import { PROJECT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';
import { Badge } from '../../schemas';
import { BadgeItem } from '../badge-item';

type BadgeListProps = {
  badges: Badge[];
  isLoading?: boolean;
};

export function BadgeList({ badges, isLoading }: BadgeListProps) {
  const router = useRouter();

  const handleVisitProject = () => {
    router.push(PROJECT_PATH.ROOT);
  };
  return badges.length > 0 && !isLoading ? (
    <ul className="grid grid-cols-3 xs:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <BadgeItem key={badge.id} badge={badge} />
      ))}
    </ul>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-dark-grey">
      <p className="font-semibold">품앗이하고 뱃지를 모으세요!</p>
      <button
        className="text-blue hover:underline cursor-pointer"
        onClick={handleVisitProject}
      >
        품앗이하러 가기
      </button>
    </div>
  );
}
