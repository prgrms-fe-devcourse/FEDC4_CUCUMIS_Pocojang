import { RootState } from '@/stores';

import { ProjectDetailState } from './slice';

export const projectDetailSelector = (state: RootState): ProjectDetailState =>
  state.projectDetail;
