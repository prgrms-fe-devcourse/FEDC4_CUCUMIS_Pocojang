import type { RequestBodyLikesDeleteType } from '@/types/api/likes/delete/RequestBodyDeleteLikesType';
import type { LikeType } from '@/types';
import api from '@/utils/api';

export const deleteLikes = async (
  rq: RequestBodyLikesDeleteType,
): Promise<LikeType> => {
  return await api.del<RequestBodyLikesDeleteType, LikeType>(
    '/likes/delete',
    rq,
  );
};
