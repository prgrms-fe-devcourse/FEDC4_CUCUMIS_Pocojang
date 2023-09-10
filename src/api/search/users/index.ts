// users/ {query부분}
import api from '@/utils/api';
import type { UserType } from '@/types';
export const searchUsers = async (): Promise<UserType> => {
  return await api.get<null, UserType>('/search/users/{query}');
};
