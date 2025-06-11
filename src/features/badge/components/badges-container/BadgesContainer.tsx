'use client';

import { AlertModal, ModalPortal } from '@/components';
import { useState } from 'react';
import { Badge as BadgeType } from '../../schemas';
import { BadgeList } from '../badge-list';

type BadgesContainerProps = {
  badges: BadgeType[];
};

export function BadgesContainer({ badges }: BadgesContainerProps) {
  const [isBadgeListModalOpen, setIsBadgeListModalOpen] = useState(false);

  const handleBadgeListModalToggle = () => {
    setIsBadgeListModalOpen((prev) => !prev);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-end w-full">
        <h2 className="text-lg font-semibold">내가 모은 뱃지</h2>
        <button
          className="text-sm text-blue cursor-pointer hover:underline"
          onClick={handleBadgeListModalToggle}
        >
          더 보기
        </button>
      </div>
      <div className="bg-blue-white rounded-xl p-4">
        <BadgeList badges={badges.slice(0, 12)} />
      </div>
      {isBadgeListModalOpen && (
        <ModalPortal>
          <AlertModal onClose={handleBadgeListModalToggle} buttonText="확인">
            <div className="max-h-[340px] overflow-auto bg-light-grey p-4">
              <BadgeList badges={badges} />
            </div>
          </AlertModal>
        </ModalPortal>
      )}
    </section>
  );
}
