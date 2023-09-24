import { ProjectType } from '@/stores/projects/slice';

import { RootState } from '..';

export const projectsSelector = (state: RootState): ProjectType[] =>
  state.projects.list;
