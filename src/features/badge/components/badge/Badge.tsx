import { cn } from '@/utils/style';
import Image from 'next/image';

type BadgeProps = {
  imageUrl: string;
  size?: 'md' | 'lg';
};

export function Badge({ imageUrl, size = 'md' }: BadgeProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center z-30 rounded-full overflow-hidden shadow-sm',
        size === 'md' ? 'w-12 h-12 ' : 'w-16 h-16',
      )}
    >
      <Image
        src={imageUrl}
        alt="프로젝트 뱃지"
        fill
        sizes="100%"
        className="object-contain"
      />
    </div>
  );
}
