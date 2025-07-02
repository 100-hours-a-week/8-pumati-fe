import { ProfileImage } from '@/components';
import { COURSE } from '@/constants';
import { TeamMember } from '../../schemas';

type MemberItemProps = {
  member: TeamMember;
};

export function MemberItem({ member }: MemberItemProps) {
  const { id, profileImageUrl, nickname, name, course } = member;
  return (
    <li
      key={id}
      className="flex items-center gap-4 py-3 mx-1 border-b border-light-grey"
    >
      <ProfileImage src={profileImageUrl} alt={name} size="md" />
      <div>
        <p className="font-medium">
          {nickname}({name})
        </p>
        <p className="text-sm text-grey">{COURSE[course]}</p>
      </div>
    </li>
  );
}
