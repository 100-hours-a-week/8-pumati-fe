'use client';

import { CallToAction } from '@/components';
import { useIntersectionObserve } from '@/hooks';
import { useState } from 'react';
import { useComments } from '../../hooks';
import { CommentList } from './CommentList';
import { CreateCommentModalContent } from './CreateCommentModalContent';

type CommentsProps = {
  projectId: number;
  title: string;
};

export function Comments({ projectId, title }: CommentsProps) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useComments(projectId);
  const comments = data.pages.flatMap((page) => page.data);

  const ref = useIntersectionObserve({
    onIntersect: (entry, observer) => {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  return (
    <section className="flex flex-col gap-4 mt-14">
      <h2 className="text-lg font-semibold">프로젝트 후기</h2>
      <CallToAction
        text="후기를 작성해보세요!"
        buttonText="후기 작성"
        action={() => setIsCommentModalOpen(true)}
      />
      <CommentList
        ref={ref}
        isFetchingNextPage={isFetchingNextPage}
        comments={comments}
      />
      {isCommentModalOpen && (
        <CreateCommentModalContent
          projectId={projectId}
          title={title}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </section>
  );
}
