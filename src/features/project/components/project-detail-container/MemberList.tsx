import { getTeamMembers } from '../../services';
import { MemberItem } from './MemberItem';

type MemberListProps = {
  teamId: number;
};

export async function MemberList({ teamId }: MemberListProps) {
  const teamMembers = await getTeamMembers(teamId);

  return (
    <section>
      <h2 className="text-lg font-semibold mt-16 mb-4">
        이 프로젝트를 만든 팀이에요
      </h2>
      {teamMembers && teamMembers.length > 0 ? (
        <ul className="flex flex-col">
          {teamMembers.map((member) => (
            <MemberItem key={member.id} member={member} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-center text-gray-500">
          아직 팀원이 없습니다.
        </p>
      )}
    </section>
  );
}
