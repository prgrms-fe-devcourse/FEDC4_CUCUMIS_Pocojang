import { projectDetailSlice } from './slice';

export const projectDetailReducer = projectDetailSlice.reducer;
export const { setProjectDetailResponse } = projectDetailSlice.actions;
