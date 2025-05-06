import { ProjectItem } from '../../schemas';
import { CardItem } from '../card-item';

type CardListProps = {
  projects: ProjectItem[];
};

export function CardList({ projects }: CardListProps) {
  return (
    <article className="w-full">
      <ul className="flex flex-col gap-5">
        {projects.map((project) => (
          <CardItem key={project.id} project={project} />
        ))}
      </ul>
    </article>
  );
}
