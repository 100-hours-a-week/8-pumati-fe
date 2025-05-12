import { getLatestProjects } from '../../services';
import { ProjectGallery } from '../project-gallery';

export async function LatestProjects() {
  const { data: projects } = await getLatestProjects(
    new Date().toISOString(),
    0,
    5,
  );

  return <ProjectGallery projects={projects} />;
}
