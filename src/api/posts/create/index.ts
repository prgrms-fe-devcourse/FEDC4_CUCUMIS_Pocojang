import api from '@/utils/api';

export const getPostId = async (rq: FormData): Promise<null> => {
  return await api.post<FormData, null>('/posts/create', rq);
};
