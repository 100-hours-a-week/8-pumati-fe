'use client';

import { cn } from '@/utils/style';

type TagItemProps = {
  tag: string;
  isSelected: boolean;
  onToggleTag: (tag: string) => void;
};

export function TagItem({ tag, isSelected, onToggleTag }: TagItemProps) {
  return (
    <li className="flex items-center" onClick={() => onToggleTag(tag)}>
      <button
        type="button"
        className={cn(
          'px-3 py-1 text-center text-sm font-medium bg-light-blue text-blue border border-soft-blue rounded-full cursor-pointer transition-colors duration-100',
          isSelected && 'bg-blue text-white border-blue',
        )}
      >
        {tag}
      </button>
    </li>
  );
}
