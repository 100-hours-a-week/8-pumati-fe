import { Dashboard, Information } from '@/features/user/components';
import { AuthData, Team } from '@/features/user/schemas';

const MY_DATA: AuthData = {
  id: 1,
  teamId: 8,
  teamNumber: 8,
  term: 2,
  email: 'jay@kakao.com',
  isSocial: true,
  name: '권덕재',
  nickname: 'jay',
  course: 'FULL_STACK',
  profileImageUrl:
    'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/94cc479c-b871-430f-8a49-c1625b761a7c.jpeg',
  role: 'TRAINEE',
  emailOptInAt: '2025-03-12T00:00:00Z',
  emailOptOutAt: null,
  state: 'ACTIVE',
  createdAt: '2025-03-12T00:00:00Z',
  modifiedAt: '2025-03-12T00:00:00Z',
};

const DASHBOARD: Team = {
  id: 1,
  term: 2,
  number: 8,
  projectId: 1,
  rank: 1,
  givedPumatiCount: 300,
  receivedPumatiCount: 300,
  badgeImageUrl:
    'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/94cc479c-b871-430f-8a49-c1625b761a7c.jpeg',
  createdAt: '2025-03-12T00:00:00Z',
  modifiedAt: '2025-03-12T00:00:00Z',
};

export default async function MyPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">마이페이지</h1>
      <Information user={MY_DATA} />
      <Dashboard dashboard={DASHBOARD} />
    </>
  );
}
