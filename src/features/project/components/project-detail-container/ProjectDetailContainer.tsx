import { ProjectDetail, TeamMember } from '../../schemas';
import { Carousel } from '../carousel';
import { Comments } from './Comments';
import { Dashboard } from './Dashboard';
import { Description } from './Description';
import { TeamMemberList } from './TeamMemberList';

const PROJECT_DETAUL_DATA: ProjectDetail = {
  id: 1,
  teamId: 1,
  title: '품앗이',
  term: 2,
  teamNumber: 8,
  introduction:
    '카카오 테크 부트캠프 교육생의 성장 과정과 프로젝트를 한눈에 보고, 출석까지 관리할 수 있는 교육생 중심 플랫폼입니다.',
  detailedDescription: `카카오 테크 부트캠프 교육생들의 성장 기록을 한눈에 볼 수 있는 플랫폼, 지금 시작합니다.
 이 서비스는 교육생들이 남긴 생생한 후기와 파이널 프로젝트 결과물을 모아, 예비 교육생과 외부에 진짜 카테부의 모습을 전달합니다. 개별 GitHub나 블로그에 흩어져 있던 결과물 대신, 한 곳에서 쉽게 보고, 찾고, 공유할 수 있는 구조를 제공합니다.

 또한, 교육생들은 출석을 간편하게 체크하고, 운영진과 강사진은 실시간으로 출석 현황을 확인할 수 있어, 반복적인 수작업 없이 효율적인 관리가 가능합니다.
 기억하고 싶은 여정, 보여주고 싶은 성과, 그리고 더 나은 운영을 위한 관리.
 이 모든 것을 하나로 담은, 카카오 테크 부트캠프 전용 성장 플랫폼입니다.`,
  representativeImageUrl:
    'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
  images: [
    {
      id: 1,
      projectId: 1,
      url: 'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
      sequence: 1,
      createdAt: '2025-05-07T21:32:03.196091',
      modifiedAt: '2025-05-07T21:32:03.196091',
    },
    {
      id: 2,
      projectId: 1,
      url: 'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
      sequence: 2,
      createdAt: '2025-05-07T21:32:03.205359',
      modifiedAt: '2025-05-07T21:32:03.205359',
    },
  ],
  deploymentUrl: 'https://github.com/100-hours-a-week/8-pumati-fe',
  githubUrl: 'https://github.com/100-hours-a-week/8-pumati-fe',
  tags: [
    {
      content: 'Pumati',
    },
    {
      content: '풀스택',
    },
    {
      content: '인공지능',
    },
    {
      content: '클라우드',
    },
    {
      content: '카카오테크부트캠프',
    },
  ],
  givedPumatiCount: 42,
  receivedPumatiCount: 100,
  teamRank: 1,
  badgeImageUrl: null,
  isSubscribed: false,
  createdAt: '2025-05-07T21:32:03.18467',
  modifiedAt: '2025-05-07T21:32:03.18467',
};

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

export function ProjectDetailContainer() {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-w-[25rem] w-full mx-auto">
        <Carousel images={PROJECT_DETAUL_DATA.images} />
        <Description
          title={PROJECT_DETAUL_DATA.title}
          modifiedAt={PROJECT_DETAUL_DATA.modifiedAt}
          term={PROJECT_DETAUL_DATA.term}
          introduction={PROJECT_DETAUL_DATA.introduction}
          deploymentUrl={PROJECT_DETAUL_DATA.deploymentUrl}
          detailedDescription={PROJECT_DETAUL_DATA.detailedDescription}
          tags={PROJECT_DETAUL_DATA.tags}
        />
        <TeamMemberList teamMembers={TEAM_MEMBER_DATA} />
      </div>
      <div className="xs:py-10 xs:px-2 my-20 xs:my-10 bg-blue-white">
        <Dashboard
          givedPumatiCount={PROJECT_DETAUL_DATA.givedPumatiCount}
          receivedPumatiCount={PROJECT_DETAUL_DATA.receivedPumatiCount}
          teamRank={PROJECT_DETAUL_DATA.teamRank}
        />
      </div>
      <div className="max-w-[25rem] w-full mx-auto">
        <Comments />
      </div>
    </div>
  );
}
