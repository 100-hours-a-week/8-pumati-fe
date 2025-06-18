import { ApiError } from '@/utils/error';
import { getRankedProjects, getSnapshot } from '../../services';
import { SimpleProjects } from '../simple-projects';

export async function RankedProjects() {
  const snapshot = await getSnapshot();

  if (!snapshot) {
    throw new ApiError(404, 'Snapshot not found');
  }

  const { data: projects } = await getRankedProjects(snapshot.id, 0, 3);

  return <SimpleProjects projects={projects} />;
}
