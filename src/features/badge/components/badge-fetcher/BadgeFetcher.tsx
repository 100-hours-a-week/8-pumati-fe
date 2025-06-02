import { BadgeList } from '../badge-list';

export function BadgeFetcher() {
  const badges = [
    {
      id: 1,
      projectId: 1,
      teamId: 8,
      term: 2,
      teamNumber: 8,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 1,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
    {
      id: 2,
      projectId: 2,
      teamId: 2,
      term: 2,
      teamNumber: 2,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 9,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
    {
      id: 3,
      projectId: 3,
      teamId: 8,
      term: 2,
      teamNumber: 8,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 99,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
    {
      id: 4,
      projectId: 4,
      teamId: 2,
      term: 2,
      teamNumber: 2,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 999,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
    {
      id: 5,
      projectId: 5,
      teamId: 8,
      term: 2,
      teamNumber: 8,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 9503,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
    {
      id: 6,
      projectId: 12,
      teamId: 2,
      term: 2,
      teamNumber: 2,
      badgeImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/b5c9d9f1-3a07-41a9-8e67-de9df5fa5771.png',
      acquiredCount: 99999,
      createdAt: '2025-03-12T00:00:00Z',
      modifiedAt: '2025-03-12T00:00:00Z',
    },
  ];

  return <BadgeList badges={badges} />;
}
