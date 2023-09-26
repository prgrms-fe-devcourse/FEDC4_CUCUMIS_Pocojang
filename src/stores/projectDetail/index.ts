import { projectDetailSlice } from './slice';

export const projectDetailReducer = projectDetailSlice.reducer;
export const {
  setPost,
  setIsLoading,
  setAddComment,
  setDeleteComment,
  setUpdateComment,
  setDeleteFollow,
} = projectDetailSlice.actions;
