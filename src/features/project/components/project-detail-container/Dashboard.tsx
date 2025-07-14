import { Tooltip } from '@/components';
import { abbreviateCountToK } from '@/utils/count';
import { ProjectDashboard } from '../../schemas';

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
        <Tooltip>
          <h3 className="font-semibold mb-2">품앗이는?</h3>
          <p className="mb-1">다른 팀의 프로젝트를 방문하는 행위예요!</p>
          <p>준 품앗이 횟수에 따라 등수가 올라가요!</p>
          <p>많이 방문할수록 우리 팀의 프로젝트가 상단에 노출돼요!</p>
          <p className="text-sm mb-1">
            다른 프로젝트에 <strong>품앗이</strong>를 하면, 해당 팀에 우리 팀의{' '}
            <strong>뱃지</strong>가 전달돼요!
          </p>
        </Tooltip>
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
