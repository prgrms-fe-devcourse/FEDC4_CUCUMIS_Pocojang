import api from '@/utils/api';
import type { RequestBodyCreatePostType } from '@/types/api/posts/create/RequestBodyCreatePostType';
import { PostType } from '@/types';

export const createPost = async (
  rq: RequestBodyCreatePostType,
): Promise<PostType> => {
  return await api.post<RequestBodyCreatePostType, PostType>(
    '/posts/create',
    rq,
  );
};
