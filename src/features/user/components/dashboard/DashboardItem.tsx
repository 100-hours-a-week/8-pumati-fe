import { abbreviateCountToK } from '@/utils/count';
import { cn } from '@/utils/style';

type DashboardItemProps = {
  value: number | null;
  unit: string;
  textColor: string;
};

export function DashboardItem({ value, unit, textColor }: DashboardItemProps) {
  return (
    <p className={cn('font-bold text-base xs:text-xl', textColor)}>
      {value !== null ? abbreviateCountToK(value) : '-'}
      <span className="text-xs xs:text-sm">{unit}</span>
    </p>
  );
}
