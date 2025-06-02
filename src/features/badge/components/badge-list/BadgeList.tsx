import { Badge as BadgeType } from '../../schemas';
import { BadgeItem } from '../badge-item';

type BadgeListProps = {
  badges: BadgeType[];
};

export function BadgeList({ badges }: BadgeListProps) {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">내가 모은 뱃지</h2>
      <ul className="grid grid-cols-4 gap-4 bg-light-grey rounded-xl p-4">
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </ul>
    </section>
  );
}
