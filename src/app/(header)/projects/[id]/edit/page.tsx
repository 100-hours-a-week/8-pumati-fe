import { EditForm } from '@/features/project/components';
import { getProject } from '@/features/project/services';
import { notFound } from 'next/navigation';

type ProjectEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { id } = await params;
  const project = await getProject(Number(id));

  if (!project) {
    notFound();
  }
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-xl font-semibold mt-9">프로젝트 생성</h1>
      <EditForm project={project} />
    </section>
  );
}
