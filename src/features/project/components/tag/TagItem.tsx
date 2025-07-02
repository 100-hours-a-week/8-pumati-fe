'use client';

import { CancelIcon } from '@/components/icons';

type TagItemProps = {
  tag: string;
  removeTag?: () => void;
};

export function TagItem({ tag, removeTag }: TagItemProps) {
  const isRemoveTag = !!removeTag;

  const handleRemoveTag = () => {
    if (isRemoveTag) {
      removeTag();
    }
  };
  return (
    <li className="flex items-center gap-[6px] px-3 py-1 bg-light-blue border border-soft-blue rounded-full">
      <span className="text-center text-blue text-sm font-medium">{tag}</span>
      {isRemoveTag && (
        <button onClick={handleRemoveTag}>
          <CancelIcon
            width={8}
            height={8}
            fill="var(--color-blue)"
            stroke="var(--color-blue)"
            strokeWidth="2"
            className="cursor-pointer"
          />
        </button>
      )}
    </li>
  );
}
