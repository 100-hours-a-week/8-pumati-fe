import { InfoIcon } from '@/components/icons';
import { cn } from '@/utils/style';

type TooltipProps = {
  children: React.ReactNode;
  direction?: 'right' | 'left';
};

export function Tooltip({ children, direction = 'left' }: TooltipProps) {
  return (
    <div className="relative group">
      <InfoIcon
        width={22}
        height={22}
        stroke="var(--color-dark-grey)"
        className="cursor-pointer"
      />
      <div
        className={cn(
          'absolute top-6 right-0 p-4 hidden group-hover:flex group-hover:flex-col group-hover:gap-1 text-sm bg-black/80 text-white shadow-lg rounded-lg w-xs',
          direction === 'right' && 'translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  );
}
