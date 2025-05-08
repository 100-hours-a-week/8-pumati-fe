import { COURSE } from '@/constants';
import { dateYYYYMMDD } from '@/utils/date';
import Image from 'next/image';
import { CommentItem as CommentItemType } from '../../schemas';

type CommentItemProps = {
  comment: CommentItemType;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { author, content, createdAt } = comment;

  return (
    <li className="border-b border-light-grey">
      <div className="flex justify-start items-start gap-4 py-3 mx-1">
        <Image
          src={author.profileImageUrl}
          alt={author.name}
          width={52}
          height={52}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="w-full">
            <div className="flex gap-1">
              <p className="font-medium">
                {author.nickname}({author.name})
              </p>
              <p className="text-sm text-dark-grey">
                {author.course ? COURSE[author.course] : '외부인'}
              </p>
            </div>
            <p className="text-sm text-grey">{dateYYYYMMDD(createdAt)}</p>
          </div>
          <p>{content}</p>
        </div>
      </div>
    </li>
  );
}
