import { BADGE_TAGS } from '@/constants';
import { TagItem } from './TagItem';

type TagListProps = {
  tags: string[];
  onToggleTag: (tag: string) => void;
};

export function TagList({ tags, onToggleTag }: TagListProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {BADGE_TAGS.map((tag, index) => (
        <TagItem
          key={`${tag}-${index}`}
          tag={tag}
          isSelected={tags.includes(tag)}
          onToggleTag={onToggleTag}
        />
      ))}
    </ul>
  );
}
