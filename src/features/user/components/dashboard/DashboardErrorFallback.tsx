import { cn } from '@/utils/style';

const dashboardItems = [
  'bg-light-blue border-blue',
  ,
  'bg-light-green border-green',
  ,
  'bg-light-mint border-mint',
  ,
  'bg-light-red border-red',
  ,
];

export function DashboardErrorFallback() {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <h2 className="self-start text-lg font-semibold">대시보드</h2>
      <ul className="grid grid-cols-2 gap-2 w-full blur-xs">
        {dashboardItems.map((itemStyle) => (
          <li
            key={itemStyle}
            className={cn(
              'flex flex-col items-center px-4 py-3 border rounded-xl h-28',
              itemStyle,
            )}
          ></li>
        ))}
      </ul>
    </section>
  );
}
