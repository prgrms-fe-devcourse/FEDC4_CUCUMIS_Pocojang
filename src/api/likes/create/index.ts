import api from '@/utils/api';
import type { LikeType } from '@/types';
import type { RequestBodyLikesType } from '@/types/api/likes/create/RequestBodyLikesType';

export const createLikes = async (
  rq: RequestBodyLikesType,
): Promise<LikeType> => {
  return await api.post<RequestBodyLikesType, LikeType>('/likes/create', rq);
};
