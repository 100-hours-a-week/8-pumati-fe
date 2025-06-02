'use client';

import { Button } from '@/components';
import { EditIcon } from '@/components/icons';
import { accessTokenAtom, authAtom } from '@/store';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGivePumati, useReceivePumati } from '../../hooks';
import { ProjectDetail } from '../../schemas';
import { TagList } from '../tag';

type DescriptionProps = Pick<
  ProjectDetail,
  | 'id'
  | 'teamId'
  | 'teamNumber'
  | 'title'
  | 'modifiedAt'
  | 'term'
  | 'introduction'
  | 'badgeImageUrl'
  | 'deploymentUrl'
  | 'detailedDescription'
  | 'tags'
>;

export function Description({
  id,
  teamId,
  teamNumber,
  title,
  term,
  introduction,
  badgeImageUrl,
  deploymentUrl,
  detailedDescription,
  tags,
}: DescriptionProps) {
  const router = useRouter();

  const auth = useAtomValue(authAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  const { mutateAsync: givePumati } = useGivePumati();
  const { mutateAsync: receivePumati } = useReceivePumati();

  const handleEditButtonClick = () => {
    router.push(`/projects/${id}/edit`);
  };
  const handleOpenProject = async () => {
    if (auth && auth.teamId && accessToken) {
      await givePumati({ token: accessToken, teamId: auth.teamId });
      await receivePumati({ token: accessToken, teamId: teamId });
      router.refresh();
    }

    window.open(deploymentUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-1">
        {auth?.teamId === teamId && (
          <button
            className="flex justify-center items-center self-end p-1 cursor-pointer hover:bg-light-blue rounded-lg transition-colors duration-150"
            onClick={handleEditButtonClick}
          >
            <EditIcon width={20} height={20} />
          </button>
        )}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 z-40 rounded-full overflow-hidden shadow-sm">
              <Image
                src={badgeImageUrl}
                alt="프로젝트 뱃지"
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold mr-2">{title}</h1>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="text-sm text-dark-grey font-semibold">
              {teamNumber}팀
            </p>
            <p className="text-sm text-grey">판교{term}기</p>
          </div>
        </div>
      </div>
      <p className="leading-5 mb-4 whitespace-pre-wrap break-words">
        {introduction}
      </p>
      <Button onClick={handleOpenProject}>프로젝트 바로가기</Button>
      <TagList tags={tags.map((tag) => tag.content)} />
      <div className="flex flex-col gap-4 mt-16 mb-10">
        <h2 className="text-lg font-semibold">프로젝트 상세 설명</h2>
        <pre className="leading-5 py-6 px-4 bg-light-grey rounded-lg whitespace-pre-wrap break-words">
          {detailedDescription}
        </pre>
      </div>
    </section>
  );
}
