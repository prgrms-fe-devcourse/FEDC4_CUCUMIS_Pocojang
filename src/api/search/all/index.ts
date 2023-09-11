
import api from '@/utils/api';
import type { UserType, PostType } from '@/types';
export const searchPost_User = async (): Promise<UserType | PostType> => {
  return await api.get<null, UserType | PostType>('/search/all/{query}');
};
