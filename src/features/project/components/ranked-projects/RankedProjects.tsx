import { getRankedProjects, getSnapshot } from '../../services';
import { SimpleCardList } from '../simple-card-list';

export async function RankedProjects() {
  const { id } = await getSnapshot();

  const { data: projects } = await getRankedProjects(id, 0, 3);

  return <SimpleCardList projects={projects} />;
}
