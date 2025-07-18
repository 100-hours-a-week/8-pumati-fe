import { PROJECT_PATH } from '@/constants';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectItem } from '../../schemas';
import { TagList } from '../tag';

type SimpleCardItemProps = {
  project: ProjectItem;
  rank?: number;
  priority?: boolean;
};

export function SimpleCardItem({
  project,
  rank,
  priority,
}: SimpleCardItemProps) {
  const { id, representativeImageUrl, title, introduction, teamNumber, tags } =
    project;

  return (
    <li>
      <Link
        href={PROJECT_PATH.DETAIL(id.toString())}
        className="flex flex-col gap-2 cursor-pointer px-4 py-3 border rounded-lg border-light-blue shadow-lg hover:-translate-y-2 transition-transform duration-200"
      >
        <div className="flex gap-4">
          <div className="relative aspect-square xs:aspect-[16/9] h-18 bg-blue-white shrink-0 rounded-lg">
            <Image
              src={representativeImageUrl}
              alt={title}
              fill
              sizes="(max-width: 400px) 72px, 128px"
              className="object-contain"
              priority={priority}
            />
            {rank && (
              <span
                className={cn(
                  'absolute overflow-hidden -top-2 -left-2 rounded-full w-7 h-7 z-10 border-2 flex items-center justify-center text-white font-bold',
                  rank === 1
                    ? 'bg-[#FFD700] border-[#E6C200]'
                    : rank === 2
                      ? 'bg-[#C0C0C0] border-[#A8A8A8]'
                      : 'bg-[#CD7F32] border-[#B87333]',
                )}
              >
                <span className="absolute -bottom-1 -left-2 w-10 h-2 bg-white opacity-30 transform -rotate-45 pointer-events-none" />
                {rank}
              </span>
            )}
          </div>
          <div className="grow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg truncate">{title}</h3>
              <span className="text-sm text-dark-grey font-semibold">
                {teamNumber}팀
              </span>
            </div>
            <p className="mt-1 text-sm xs:text-[15px] text-dark-grey line-clamp-2 whitespace-pre-wrap break-all">
              {introduction}
            </p>
          </div>
        </div>
        <TagList tags={tags.map((tag) => tag.content)} />
      </Link>
    </li>
  );
}
