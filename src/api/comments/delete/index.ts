import api from '@/utils/api';
import type { CommentType } from '@/types';
import type { RequestBodyDeleteCommentsType } from '@/types/api/comments/delete/RequestBodyDeleteCommentsType';

export const deleteComments = async (
  rq: RequestBodyDeleteCommentsType,
): Promise<CommentType> => {
  return await api.del<RequestBodyDeleteCommentsType, CommentType>(
    '/comments/delete',
    rq,
  );
};
