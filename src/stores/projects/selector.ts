import { ProjectType } from '@/stores/projects/slice';

import { RootState } from '..';

export const projectsSelector = (state: RootState): ProjectType[] =>
  state.projects.ProjectList;
export const isFetchingSelector = (state: RootState): boolean =>
  state.projects.isFetching;
