import api from '@/utils/api';
import type { UserType } from '@/types';

export const getUserId = async (userId: string): Promise<UserType> => {
  return await api.get<null, UserType>(`/users/${userId}`);
};
