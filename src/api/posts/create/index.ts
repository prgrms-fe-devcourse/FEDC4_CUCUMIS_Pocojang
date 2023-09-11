import api from '@/utils/api';
import type { RequestBodyCreatePostType } from '@/types/api/posts/create/RequestBodyCreatePostType';

export const getPostId = async (
  rq: RequestBodyCreatePostType,
): Promise<null> => {
  return await api.post<RequestBodyCreatePostType, null>('/posts/create', rq);
};
