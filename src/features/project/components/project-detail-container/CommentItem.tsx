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
    <li className="border-b border-light-grey last:border-b-0">
      <div className="flex justify-start items-start gap-4 pt-3 pb-6 mx-1">
        <Image
          src={author.profileImageUrl}
          alt={author.name}
          width={52}
          height={52}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col w-full">
          <div className="w-full">
            <div className="flex items-center gap-1">
              <p className="font-medium">
                {author.nickname}({author.name})
              </p>
              <p className="text-sm text-grey font-light">
                {author.course ? COURSE[author.course] : '외부인'}
              </p>
            </div>
            <p className="text-sm text-grey text-right">
              {dateYYYYMMDD(createdAt)}
            </p>
          </div>
          <p className="whitespace-pre-wrap break-all">{content}</p>
        </div>
      </div>
    </li>
  );
}
