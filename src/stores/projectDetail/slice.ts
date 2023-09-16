import { createSlice } from '@reduxjs/toolkit';

import type {
  DeveloperContent,
  FormattedPost,
  ProjectContent,
} from '@/types/models/PostType';

export interface ProjectDetailState<T> {
  post: FormattedPost<T>;
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
    },
    createdAt: '',
    updatedAt: '',
    contents: {},
  },
};

export const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});