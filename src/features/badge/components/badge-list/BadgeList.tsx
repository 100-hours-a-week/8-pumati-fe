import { Badge } from '../../schemas';
import { BadgeItem } from '../badge-item';

type BadgeListProps = {
  badges: Badge[];
};

export function BadgeList({ badges }: BadgeListProps) {
  return (
    <ul className="grid grid-cols-4 gap-4 rounded-xl">
      {badges.map((badge) => (
        <BadgeItem key={badge.id} badge={badge} />
      ))}
    </ul>
  );
}
