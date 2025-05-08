'use client';

import { Button } from '@/components';
import { dateYYYYMMDD } from '@/utils/date';
import { ProjectDetail } from '../../schemas';
import { TagList } from '../tag';

type DescriptionProps = Pick<
  ProjectDetail,
  | 'title'
  | 'modifiedAt'
  | 'term'
  | 'introduction'
  | 'deploymentUrl'
  | 'detailedDescription'
  | 'tags'
>;

export function Description({
  title,
  modifiedAt,
  term,
  introduction,
  deploymentUrl,
  detailedDescription,
  tags,
}: DescriptionProps) {
  return (
    <section className="flex flex-col gap-4 mt-4">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold mr-2">{title}</h1>
        <div className="flex flex-col items-end">
          <p className="text-sm text-grey">{dateYYYYMMDD(modifiedAt)}</p>
          <p className="text-sm text-dark-grey">판교{term}기</p>
        </div>
      </div>
      <p className="leading-5 mb-4">{introduction}</p>
      <Button
        onClick={() =>
          window.open(deploymentUrl, '_blank', 'noopener,noreferrer')
        }
      >
        프로젝트 바로가기
      </Button>
      <TagList tags={tags.map((tag) => tag.content)} />
      <div className="flex flex-col gap-4 mt-16 mb-10">
        <h2 className="text-lg font-semibold">프로젝트 상세 설명</h2>
        <p className="leading-5 p-4 bg-light-grey rounded-lg">
          {detailedDescription}
        </p>
      </div>
    </section>
  );
}
