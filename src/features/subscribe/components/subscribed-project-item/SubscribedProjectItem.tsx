'use client';

import { PROJECT_PATH } from '@/constants';
import { Badge } from '@/features/badge/components';
import { TagList } from '@/features/project/components';
import { ProjectItem } from '@/features/project/schemas';
import Link from 'next/link';

type SubscribedProjectItemProps = {
  project: ProjectItem;
  priority?: boolean;
};

export function SubscribedProjectItem({
  project,
  priority,
}: SubscribedProjectItemProps) {
  const { id, title, badgeImageUrl, teamNumber, tags, introduction } = project;

  return (
    <li>
      <Link
        href={PROJECT_PATH.DETAIL(id.toString())}
        className="flex flex-col gap-2 cursor-pointer px-4 py-3 rounded-lg border border-light-blue shadow-lg hover:-translate-y-2 transition-transform duration-200"
      >
        <div className="flex gap-4">
          <div className="flex items-center">
            <Badge imageUrl={badgeImageUrl} size="lg" priority={priority} />
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
