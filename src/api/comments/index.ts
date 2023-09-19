import api from '@/utils/api';
import type { CommentType } from '@/types';
import {
  RequestCreateCommentType,
  RequestDeleteCommentType,
} from '@/types/api/comments';

export const createComment = async (
  request: RequestCreateCommentType,
): Promise<CommentType> =>
  api.post<RequestCreateCommentType, CommentType>('/comments/create', request);

export const deleteComment = async (
  request: RequestDeleteCommentType,
): Promise<CommentType> =>
  api.del<RequestDeleteCommentType, CommentType>('/comments/delete', request);
