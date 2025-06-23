import { cn } from '@/utils/style';

const DASHBOARDITEMS = [
  {
    title: '뱃지',
    itemStyle: 'bg-light-blue border-blue',
  },
  {
    title: '품앗이 등수',
    itemStyle: 'bg-light-green border-green',
  },
  {
    title: '준 품앗이',
    itemStyle: 'bg-light-mint border-mint',
  },
  {
    title: '받은 품앗이',
    itemStyle: 'bg-light-red border-red',
  },
];

export function DashboardFallback() {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <h2 className="self-start text-lg font-semibold">대시보드</h2>
      <ul className="grid grid-cols-2 gap-2 w-full">
        {DASHBOARDITEMS.map(({ title, itemStyle }) => (
          <li
            key={itemStyle}
            className={cn(
              'flex flex-col items-center px-4 py-3 border rounded-xl h-28',
              itemStyle,
            )}
          >
            <p className="self-start font-semibold">{title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
