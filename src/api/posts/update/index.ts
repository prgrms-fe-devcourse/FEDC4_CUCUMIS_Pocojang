import api from '@/utils/api';

export const getPostId = async (rq: FormData): Promise<null> => {
  return await api.put<FormData, null>('/posts/update', rq);
};
