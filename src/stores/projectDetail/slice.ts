import { createSlice } from '@reduxjs/toolkit';

import type { FormattedPost } from '@/types/models/PostType';

export interface ProjectDetailState {
  post: FormattedPost;
}

const initialState: ProjectDetailState = {
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
    title: '',
    requirements: '',
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
