import { RootState } from '@/stores';
import { ProjectDetailState } from '@/stores/projectDetail/slice';

export const projectDetailSelector = (state: RootState): ProjectDetailState =>
  state.projectDetail;
