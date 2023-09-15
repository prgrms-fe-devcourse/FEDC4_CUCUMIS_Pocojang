import { createSlice } from '@reduxjs/toolkit';

import DUMMY_DATA from '@/consts/projectDetail';
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
  projectDetail: ProjectDetail;
}

const initialState: ProjectDetailState = {
  projectDetail: DUMMY_DATA,
};

export const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    setProjectDetailResponse: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
});
