import { RootState } from '@/stores';
import { ProjectDetailState } from '@/stores/projectDetail/slice';
import { LikeType } from '@/types';

export const projectDetailSelector = <T>(
  state: RootState,
): ProjectDetailState<T> => state.projectDetail as ProjectDetailState<T>;

export const likesSelector = (state: RootState): LikeType[] =>
  state.projectDetail.post.likes;

export const postIdSelector = (state: RootState): string =>
  state.projectDetail.post.postId;

export const authorIdSelector = (state: RootState): string =>
  state.projectDetail.post.author._id as string;

export const isLoadingSelector = (state: RootState): boolean => {
  return state.projectDetail.isLoading;
};
