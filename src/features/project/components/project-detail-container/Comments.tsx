'use client';

import { CallToAction } from '@/components';
import { COURSE } from '@/constants';
import { dateYYYYMMDD } from '@/utils/date';
import Image from 'next/image';
import { CommentItem } from '../../schemas';

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

export function Comments() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        프로젝트 후기({COMMENTS.length})
      </h2>
      <CallToAction
        text="후기를 작성해보세요!"
        buttonText="후기 작성"
        action={() => {
          // 후기 작성 모달 오픈
        }}
      />
      <ul className="flex flex-col gap-4">
        {COMMENTS.map((comment) => (
          <li key={comment.id} className="border-b border-light-grey">
            <div className="flex justify-start items-start gap-4 py-3 mx-1">
              <Image
                src={comment.author.profileImageUrl}
                alt={comment.author.name}
                width={52}
                height={52}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <div className="w-full">
                  <div className="flex gap-1">
                    <p className="font-medium">
                      {comment.author.nickname}({comment.author.name})
                    </p>
                    <p className="text-sm text-dark-grey">
                      {comment.author.course
                        ? COURSE[comment.author.course]
                        : '외부인'}
                    </p>
                  </div>
                  <p className="text-sm text-grey">
                    {dateYYYYMMDD(comment.createdAt)}
                  </p>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
