import { getLatestProjects } from '../../services';
import { ProjectGallery } from '../project-gallery';
import { ProjectGalleryErrorFallback } from '../project-gallery/ProjectGalleryErrorFallback';

export async function LatestProjects() {
  try {
    const { data: projects } = await getLatestProjects(null, 0);

    return <ProjectGallery projects={projects} />;
  } catch (error) {
    return <ProjectGalleryErrorFallback />;
  }
}
