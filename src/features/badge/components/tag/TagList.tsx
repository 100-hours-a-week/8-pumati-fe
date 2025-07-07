import { BADGE_TAGS } from '@/constants';
import { TagItem } from './TagItem';

type TagListProps = {
  selectedTag: string;
  onToggleTag: (tag: string) => void;
};

export function TagList({ selectedTag, onToggleTag }: TagListProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {BADGE_TAGS.map((tag, index) => (
        <TagItem
          key={`${tag}-${index}`}
          tag={tag}
          isSelected={selectedTag === tag}
          onToggleTag={onToggleTag}
        />
      ))}
    </ul>
  );
}
