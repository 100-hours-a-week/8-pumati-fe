import { DotMenuIcon } from '@/components/icons';
import { COURSE } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { authAtom } from '@/store';
import { dateDistance } from '@/utils/date';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { CommentItem as CommentItemType } from '../../schemas';

type CommentItemProps = {
  comment: CommentItemType;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { author, content, createdAt } = comment;
  const { nickname, name, course, profileImageUrl, id } = author;

  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const auth = useAtomValue(authAtom);

  useOutsideClick(menuRef, () => setIsMenuOpen(false));
  return (
    <li className="border-b border-light-grey last:border-b-0">
      <div className="flex justify-start items-start gap-4 pt-3 pb-6 mx-1">
        <Image
          src={profileImageUrl}
          alt={name}
          width={52}
          height={52}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col w-full">
          <div className="w-full">
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-1">
                <p className="font-medium">
                  {nickname}({name})
                </p>
                <p className="text-sm text-dark-grey font-light">
                  {course ? COURSE[course] : '외부인'}
                </p>
              </div>
              {auth?.id === id && (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <DotMenuIcon width={20} height={18} />
                  </button>
                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-full flex flex-col bg-white rounded-md shadow-md border border-light-grey"
                    >
                      <button className="px-6 py-2 border-b border-light-grey cursor-pointer">
                        수정
                      </button>
                      <button className="px-6 py-2 cursor-pointer">삭제</button>
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="text-sm font-light text-grey">
              {dateDistance(createdAt)}
            </p>
          </div>
          <p className="whitespace-pre-wrap break-all">{content}</p>
        </div>
      </div>
    </li>
  );
}
