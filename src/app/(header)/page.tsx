import { ProjectGallery } from '@/features/project/components';
import { SimpleCardList } from '@/features/project/components/simple-card-list';
import { ProjectItem } from '@/features/project/schemas';
import { Attendance } from '@/features/user/components/attendance';

const latestProjects: ProjectItem[] = [
  {
    id: 1,
    teamId: 101,
    term: 2,
    teamNumber: 1,
    badgeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    representativeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    title: 'pumati',
    introduction:
      '카카오 테크 부트캠프 교육생의 성장 과정을 한눈에 보고, 출석까지 관리할 수 있는 교육생 중심 플랫폼입니다.카카오 테크 부트캠프 교육생의 성장 과정을 한눈에 보고, 출석까지 관리할 수 있는 교육생 중심 플랫폼입니다.',
    tags: [
      '풀스택',
      '품앗이awegaawe',
      '품앗이awegaawe',
      '품앗이awegaawe',
      '품앗이awegaawe',
    ],
    givedPumatiCount: 120,
    receivedPumatiCount: 95,
    createdAt: '2025-05-01T10:15:30Z',
    modifiedAt: '2025-05-05T14:22:10Z',
  },
  {
    id: 2,
    teamId: 102,
    term: 2,
    teamNumber: 2,
    badgeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    representativeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    title: 'goorm Dive',
    introduction:
      '실무자와 함께 하는 실전 프로젝트 경험, 맞춤형 멘토링을 제공하는 Deep Dive 프로그램입니다.',
    tags: ['AI', '클라우드', '품앗이클라우드클라우드클라우', '품앗이awegaawe'],
    givedPumatiCount: 75,
    receivedPumatiCount: 80,
    createdAt: '2025-04-28T09:00:00Z',
    modifiedAt: '2025-05-03T16:45:00Z',
  },
  {
    id: 3,
    teamId: 103,
    term: 3,
    teamNumber: 1,
    badgeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    representativeImageUrl:
      'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    title: 'Campus Connect',
    introduction:
      '교육생들 간 네트워킹과 협업을 돕는 플랫폼으로, 프로젝트 콜라보레이션을 쉽게 관리할 수 있습니다.',
    tags: ['풀스택', '협업'],
    givedPumatiCount: 45,
    receivedPumatiCount: 50,
    createdAt: '2025-05-02T11:20:00Z',
    modifiedAt: '2025-05-06T08:30:00Z',
  },
];

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 pb-15">
      <SimpleCardList projects={latestProjects} />
      <Attendance />
      <ProjectGallery projects={latestProjects} />
    </section>
  );
}
