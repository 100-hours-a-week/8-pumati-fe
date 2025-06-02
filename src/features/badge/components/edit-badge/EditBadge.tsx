'use client';

import { Button } from '@/components';
import { Badge } from '../badge';

type EditBadgeProps = {
  badgeImageUrl: string;
};

export function EditBadge({ badgeImageUrl }: EditBadgeProps) {
  return (
    <article className="flex flex-col gap-2 pt-3 pb-7 w-full max-w-[540px]">
      <div>
        <p className="font-medium">뱃지</p>
        <p></p>
      </div>
      <div className="flex items-center justify-between px-4 py-3 rounded-md border border-soft-grey bg-light-grey">
        <Button type="button" size="sm">
          뱃지 변경
        </Button>
        <Badge imageUrl={badgeImageUrl} />
      </div>
    </article>
  );
}
