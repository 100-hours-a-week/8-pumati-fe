import { COURSE } from '@/constants';
import Image from 'next/image';
import { TeamMember } from '../../schemas';

type TeamMemberListProps = {
  teamMembers: TeamMember[];
};

export function TeamMemberList({ teamMembers }: TeamMemberListProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold mt-16 mb-4">
        이 프로젝트를 만든 팀이에요
      </h2>
      <ul className="flex flex-col">
        {teamMembers.map((teamMember) => (
          <li
            key={teamMember.id}
            className="flex justify-start items-center gap-4 py-3 mx-3 border-b border-light-grey"
          >
            <Image
              src={teamMember.profileImageUrl}
              alt={teamMember.name}
              width={52}
              height={52}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium">
                {teamMember.nickname}({teamMember.name})
              </p>
              <p className="text-sm text-grey">{COURSE[teamMember.course]}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
