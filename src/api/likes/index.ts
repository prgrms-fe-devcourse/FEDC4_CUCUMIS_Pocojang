import api from '@/utils/api';
import type { LikeType } from '@/types';
import {
  RequestCancelLikePostType,
  RequestLikePostType,
} from '@/types/api/likes';

export const likePost = async (
  request: RequestLikePostType,
): Promise<LikeType> =>
  api.post<RequestLikePostType, LikeType>('/likes/create', request);

export const cancelLikePost = async (
  request: RequestCancelLikePostType,
): Promise<LikeType> =>
  api.del<RequestCancelLikePostType, LikeType>('/likes/delete', request);
