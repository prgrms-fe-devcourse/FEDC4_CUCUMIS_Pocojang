import { projectDetailSlice } from './slice';

export const projectDetailReducer = projectDetailSlice.reducer;
export const { setPost, setIsLoading } = projectDetailSlice.actions;
