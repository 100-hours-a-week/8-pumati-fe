import { InfoIcon } from '@/components/icons';
import { abbreviateCountToK } from '@/utils/count';
import { ProjectDashboard } from '../../schemas';
import { Tooltip } from './Tooltip';

type DashboardProps = ProjectDashboard;

export function Dashboard({
  givedPumatiCount,
  receivedPumatiCount,
  teamRank,
}: DashboardProps) {
  const dashboardData = [
    {
      title: '받은 품앗이',
      value: receivedPumatiCount,
      unit: '번',
    },
    {
      title: '준 품앗이',
      value: givedPumatiCount,
      unit: '번',
    },
    {
      title: '품앗이 등수',
      value: teamRank,
      unit: '등',
    },
  ];
  return (
    <section className="flex flex-col gap-3 p-4 pb-6 bg-soft-blue rounded-lg max-w-[25rem] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">대시보드</h2>
        <div className="relative group">
          <InfoIcon
            width={22}
            height={22}
            stroke="var(--color-dark-grey)"
            className="cursor-pointer"
          />
          <Tooltip />
        </div>
      </div>
      <ul className="flex w-full bg-white rounded-lg">
        {dashboardData.map((data) => (
          <li
            key={data.title}
            className="flex flex-col items-center my-3 px-3 w-1/3 border-r border-light-grey last:border-r-0"
          >
            <p className="text-sm text-grey font-medium">{data.title}</p>
            <p className="font-bold text-blue">
              {abbreviateCountToK(data.value)}
              <span className="text-xs">{data.unit}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
