import { cn } from '@/utils/style';
import Image from 'next/image';

type ProfileImageProps = {
  src: string;
  alt: string;
  size: 'sm' | 'md' | 'lg';
  priority?: boolean;
};

export function ProfileImage({ src, alt, size, priority }: ProfileImageProps) {
  const sizes = size === 'sm' ? '40px' : size === 'md' ? '52px' : '64px';

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full',
        size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-13 h-13' : 'w-16 h-16',
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
