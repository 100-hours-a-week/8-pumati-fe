'use client';

import { Button } from '@/components';
import { useState } from 'react';
import { Badge } from '../badge';
import { EditBadgeModalContent } from '../edit-badge-modal-content';

type EditBadgeProps = {
  badgeImageUrl: string;
};

export function EditBadge({ badgeImageUrl }: EditBadgeProps) {
  const [isBadgeEditModalOpen, setIsBadgeEditModalOpen] = useState(false);

  return (
    <article className="flex flex-col gap-2 pt-3 pb-7 w-full max-w-[540px]">
      <p className="font-medium">팀 뱃지</p>
      <p className="text-grey text-sm">
        * 최대 2~3분 정도 소요될 수 있으며, 새로고침 후 적용됩니다.
      </p>
      <div className="flex items-center justify-between px-4 py-3 rounded-md border border-grey ">
        <Button
          type="button"
          size="sm"
          onClick={() => setIsBadgeEditModalOpen(true)}
        >
          팀 뱃지 변경
        </Button>
        <Badge imageUrl={badgeImageUrl} />
      </div>
      {isBadgeEditModalOpen && (
        <EditBadgeModalContent onClose={() => setIsBadgeEditModalOpen(false)} />
      )}
    </article>
  );
}
