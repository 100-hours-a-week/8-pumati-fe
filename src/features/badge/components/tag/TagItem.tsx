import { cn } from '@/utils/style';

type TagItemProps = {
  tag: string;
  isSelected: boolean;
  onToggleTag: (tag: string) => void;
};

export function TagItem({ tag, isSelected, onToggleTag }: TagItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-[6px] px-3 py-1 bg-light-blue text-blue border border-soft-blue rounded-full cursor-pointer transition-colors duration-100',
        isSelected && 'bg-blue text-white border-blue',
      )}
      onClick={() => onToggleTag(tag)}
    >
      <span className="text-center text-sm font-medium">{tag}</span>
    </li>
  );
}
