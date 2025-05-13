import { ProjectDetailContainer } from '@/features/project/components';
import { getProject } from '@/features/project/services';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(Number(id));

  return (
    <section className="pb-25">
      <ProjectDetailContainer project={project} />
    </section>
  );
}
