import { getLatestProjects } from '../../services';
import { ProjectGallery } from '../project-gallery';

export async function LatestProjects() {
  const { data: projects } = await getLatestProjects(null, 0, 5);

  return <ProjectGallery projects={projects} />;
}
