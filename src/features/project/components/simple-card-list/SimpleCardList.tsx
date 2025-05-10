import { ProjectItem } from '../../schemas';
import { SimpleCardItem } from '../simple-card-item';

type SimpleCardListProps = {
  projects: ProjectItem[];
};

export function SimpleCardList({ projects }: SimpleCardListProps) {
  return (
    <article className="w-full max-w-[25rem] mx-auto my-10">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="text-xl font-bold">
          품앗이 상위 <span className="text-blue">TOP3</span> 프로젝트
        </h2>
        <p className="font-medium text-dark-grey">
          지금 커뮤니티에서 <br />
          가장 활발한 프로젝트들을 소개할게요!
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {projects.slice(0, 3).map((project, index) => (
          <SimpleCardItem key={project.id} project={project} rank={index + 1} />
        ))}
      </ul>
    </article>
  );
}
