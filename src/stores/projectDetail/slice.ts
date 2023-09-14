import { createSlice } from '@reduxjs/toolkit';

import DUMMY_DATA from '@/consts/projectDetail';

interface Comment {
  AvatarProps: {
    isUserOn: boolean;
  };
  userId: string;
  author: string;
  createdAt: string;
  comment: string;
  isLastItem?: boolean;
}

interface Author {
  image: string;
  isUserOn: boolean;
  fullName: string;
  userId: string;
}

interface ProjectDetail {
  comments: Comment[];
  postId: string;
  image: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  title: string;
  contents: string;
  technicalSkill?: string[];
  position?: string;
}

interface ProjectDetailState {
  projectDetail: ProjectDetail;
}

const initialState: ProjectDetailState = {
  projectDetail: DUMMY_DATA,
};

export const ProjectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    setProjectDetailResponse: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
});
