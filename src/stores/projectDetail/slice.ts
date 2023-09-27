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
      state.isLoading = action.payload;
    },
    setAddComment: (state, action) => {
      state.post.comments.push(action.payload);
    },
    setDeleteComment: (state, action) => {
      const commentIndex = state.post.comments.findIndex(
        (comment) => comment.commentId === action.payload,
      );

      if (commentIndex !== -1) {
        state.post.comments.splice(commentIndex, 1);
      }
    },
    setUpdateComment: (state, action) => {
      const commentIndex = state.post.comments.findIndex(
        (comment) => comment.commentId === action.payload.oldId,
      );

      if (commentIndex !== -1) {
        state.post.comments[commentIndex].commentId = action.payload.newId;
      }
    },
    setDeleteLike: (state, action) => {
      const userLikeIndex = state.post.likes.findIndex(
        (like) => like.user === action.payload.userId,
      );

      if (userLikeIndex !== -1) {
        state.post.likes.splice(userLikeIndex, 1);
      }
    },
  },
});
