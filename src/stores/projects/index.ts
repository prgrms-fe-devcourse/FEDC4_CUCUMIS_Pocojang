import { projectsSlice } from '@/stores/projects/slice';
import * as selector from '@/stores/projects/selector';

export const projectsReducer = projectsSlice.reducer;
export const { setList } = projectsSlice.actions;
export const { projectsSelector } = selector;
