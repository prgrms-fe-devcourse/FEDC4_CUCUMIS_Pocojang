
import api from '@/utils/api';
import type { UserType } from '@/types';
export const searchUsers = async (query : string): Promise<UserType> => {
  return await api.get<null, UserType>(`/search/users/${query}`);
};
