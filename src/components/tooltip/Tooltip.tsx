import { InfoIcon } from '@/components/icons';
import { cn } from '@/utils/style';

type TooltipProps = {
  children: React.ReactNode;
  direction?: 'right' | 'left';
};

export function Tooltip({ children, direction = 'left' }: TooltipProps) {
  return (
    <div
      className="relative group"
      aria-label="툴팁"
      tabIndex={0}
      role="tooltip"
    >
      <InfoIcon
        width={22}
        height={22}
        stroke="var(--color-dark-grey)"
        className="cursor-pointer"
      />
      <div
        className={cn(
          'absolute top-6 right-0 p-4 hidden group-hover:flex group-focus-within:flex group-hover:flex-col group-focus-within:flex-col group-hover:gap-1 group-focus-within:gap-1 text-sm bg-black/80 text-white shadow-lg rounded-lg w-xs',
          direction === 'right' && 'translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  );
}
