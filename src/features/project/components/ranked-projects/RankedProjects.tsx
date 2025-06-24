import { getRankedProjects, getSnapshot } from '../../services';
import { SimpleProjects } from '../simple-projects';
import { RankedProjectsErrorFallback } from './RankedProjectsErrorFallback';

export async function RankedProjects() {
  try {
    const snapshot = await getSnapshot();
    const { data: projects } = await getRankedProjects(snapshot!.id, 0, 3);

    return <SimpleProjects projects={projects} />;
  } catch (error) {
    return <RankedProjectsErrorFallback />;
  }
}
