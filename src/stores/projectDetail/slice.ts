import { createSlice } from '@reduxjs/toolkit';

import type {
  DeveloperContent,
  FormattedPost,
  ProjectContent,
} from '@/types/models/PostType';

export interface ProjectDetailState<T> {
  post: FormattedPost<T>;
  isLoading: boolean;
}

const initialState: ProjectDetailState<ProjectContent | DeveloperContent> = {
  post: {
    likes: [],
    comments: [],
    postId: '',
    image: '',
    author: {
      image: '',
      fullName: '',
      _id: '',
      isOnline: false,
    },
    createdAt: '',
    updatedAt: '',
    contents: {},
  },
  isLoading: false,
};

export const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setIsLoading: (state, action) => {
      console.log(action);
      state.isLoading = action.payload;
    },
  },
});
