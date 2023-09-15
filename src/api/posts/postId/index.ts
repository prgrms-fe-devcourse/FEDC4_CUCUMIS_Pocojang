import api from '@/utils/api';
import type { PostType } from '@/types';

export const getPostId = async (postId: string): Promise<PostType> => {
  return await api.get<null, PostType>(`/posts/${postId}`);
};
