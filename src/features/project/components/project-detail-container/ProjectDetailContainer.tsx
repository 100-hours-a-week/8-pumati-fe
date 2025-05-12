import Image from 'next/image';
import { ProjectDetail, TeamMember } from '../../schemas';
import { Carousel } from '../carousel';
import { Comments } from './Comments';
import { Dashboard } from './Dashboard';
import { Description } from './Description';
import { TeamMemberList } from './TeamMemberList';

const TEAM_MEMBER_DATA: TeamMember[] = [
  {
    id: 1,
    teamId: 8,
    name: '권덕재',
    nickname: 'jay',
    course: 'FULL_STACK',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 2,
    teamId: 8,
    name: '윤강',
    nickname: 'gray',
    course: 'FULL_STACK',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 3,
    teamId: 8,
    name: '김민선',
    nickname: 'anna',
    course: 'AI',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 4,
    teamId: 8,
    name: '박효빈',
    nickname: 'vicky',
    course: 'AI',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 5,
    teamId: 8,
    name: '김현식',
    nickname: 'jacky',
    course: 'CLOUD',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 6,
    teamId: 8,
    name: '박열이',
    nickname: 'rowan',
    course: 'CLOUD',
    profileImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    state: 'ACTIVE',
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
    deletedAt: null,
  },
];

type ProjectDetailContainerProps = {
  project: ProjectDetail;
};

export function ProjectDetailContainer({
  project,
}: ProjectDetailContainerProps) {
  const {
    images,
    title,
    modifiedAt,
    term,
    introduction,
    deploymentUrl,
    detailedDescription,
    tags,
    givedPumatiCount,
    receivedPumatiCount,
    teamRank,
  } = project;

  return (
    <div className="flex flex-col gap-1">
      <div className="max-w-[25rem] w-full mx-auto">
        <Carousel>
          {images.map(({ id, url }) => (
            <div
              key={id}
              className="relative w-full aspect-[4/3] max-h-[300px] overflow-hidden bg-blue-white"
            >
              <Image
                src={url}
                alt="프로젝트 이미지"
                fill
                sizes="100%"
                className="object-contain group-hover:scale-105 transition-all duration-300"
                priority
              />
            </div>
          ))}
        </Carousel>
        <Description
          title={title}
          modifiedAt={modifiedAt}
          term={term}
          introduction={introduction}
          deploymentUrl={deploymentUrl}
          detailedDescription={detailedDescription}
          tags={tags}
        />
        <TeamMemberList teamMembers={TEAM_MEMBER_DATA} />
      </div>
      <div className="xs:py-10 xs:px-2 my-20 xs:my-10 bg-blue-white">
        <Dashboard
          givedPumatiCount={givedPumatiCount}
          receivedPumatiCount={receivedPumatiCount}
          teamRank={teamRank}
        />
      </div>
      <div className="max-w-[25rem] w-full mx-auto">
        <Comments />
      </div>
    </div>
  );
}
