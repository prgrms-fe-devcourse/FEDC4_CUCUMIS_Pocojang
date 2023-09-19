import { RootState } from '@/stores';
import { ProjectDetailState } from '@/stores/projectDetail/slice';

export const projectDetailSelector = <T>(
  state: RootState,
): ProjectDetailState<T> => state.projectDetail as ProjectDetailState<T>;
