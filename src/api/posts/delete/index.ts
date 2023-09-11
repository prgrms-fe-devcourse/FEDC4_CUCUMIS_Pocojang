import type { RequestBodyDeletePostType } from '@/types/api/posts/delete/RequestBodyDeletePostType';
import api from '@/utils/api';

export const getUserId = async (): Promise<null> => {
  return await api.del<RequestBodyDeletePostType, null>('/posts/delete');
};
