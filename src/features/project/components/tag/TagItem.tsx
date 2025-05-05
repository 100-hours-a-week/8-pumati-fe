import { CancelIcon } from '@/components/icons';

type TagItemProps = {
  tag: string;
  removeTag: () => void;
};

export function TagItem({ tag, removeTag }: TagItemProps) {
  return (
    <li
      className="flex items-center gap-[6px] px-3 py-1 bg-light-blue rounded-full cursor-pointer transition-all duration-100 hover:brightness-95"
      onClick={removeTag}
    >
      <span className="text-blue text-sm font-medium">{tag}</span>
      <CancelIcon
        width={8}
        height={8}
        fill="var(--color-blue)"
        stroke="var(--color-blue)"
        strokeWidth="2"
      />
    </li>
  );
}
