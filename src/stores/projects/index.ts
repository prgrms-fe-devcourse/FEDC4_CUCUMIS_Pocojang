import { projectsSlice } from '@/stores/projects/slice';
import * as selector from '@/stores/projects/selector';

export const projectsReducer = projectsSlice.reducer;
export const {
  setProjectList,

  setSearchList,
  setIsFetching,
  cleanProjectList,
} = projectsSlice.actions;
export const { projectsSelector, isFetchingSelector } = selector;
