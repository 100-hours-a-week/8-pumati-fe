'use client';

import { CallToAction } from '@/components';
import { useState } from 'react';
import { CommentItem } from '../../schemas';
import { CommentList } from './CommentList';
import { CreateCommentModalContent } from './CreateCommentModalContent';

const COMMENTS: CommentItem[] = [
  {
    id: 1,
    projectId: 1,
    fromAi: false,
    content:
      '와, 이런 프로젝트 찾고 있었는데 딱이네요! 참여하면서 많이 배울 수 있을 것 같아요.',
    author: {
      id: 1,
      name: '권덕재',
      nickname: 'jay',
      term: 2,
      course: 'FULL_STACK',
      profileImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    },
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
  },
  {
    id: 'alweibfalhb',
    projectId: 1,
    fromAi: true,
    content:
      '프로젝트 소개 잘 봤습니다! 아이디어가 신선하고 실용적이라서 관심이 생기네요.특히 기여자 중심의 품앗이 구조가 인상 깊어요.실력도 키우고 다른 분들과 협업도 해볼 수 있을 것 같아서 기대됩니다 😊앞으로도 자주 업데이트되길 응원할게요!',
    author: {
      id: null,
      name: '홍길동',
      nickname: 'pay',
      term: null,
      course: null,
      profileImageUrl:
        'https://s3-pumati-test.s3.ap-northeast-2.amazonaws.com/uploads/69f83a96-2e07-457a-84ba-27de234961f6.jpg',
    },
    createdAt: '2025-03-12T00:00:00Z',
    modifiedAt: '2025-03-12T00:00:00Z',
  },
];

type CommentsProps = {
  title: string;
};

export function Comments({ title }: CommentsProps) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        프로젝트 후기({COMMENTS.length})
      </h2>
      <CallToAction
        text="후기를 작성해보세요!"
        buttonText="후기 작성"
        action={() => setIsCommentModalOpen(true)}
      />
      <CommentList comments={COMMENTS} />
      {isCommentModalOpen && (
        <CreateCommentModalContent
          title={title}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </section>
  );
}
