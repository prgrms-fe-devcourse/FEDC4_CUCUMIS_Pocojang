import { createSlice } from '@reduxjs/toolkit';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';

export interface Comment {
  AvatarProps: BasicAvatarProps;
  userId: string;
  author: string;
  comment: string;
  isLastItem?: boolean;
  createdAt?: string;
}

interface Author {
  image: string;
  isUserOn?: boolean;
  fullName: string;
  userId: string; //_id
}

export interface ProjectDetail {
  comments: Comment[];
  postId: string; //_id
  image?: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  title: string;
  requirements: string;
}

export interface ProjectDetailState {
  post: ProjectDetail;
}

const initialState: ProjectDetailState = {
  post: {
    comments: [],
    postId: '',
    image: '',
    author: {
      image: '',
      fullName: '',
      userId: '',
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
