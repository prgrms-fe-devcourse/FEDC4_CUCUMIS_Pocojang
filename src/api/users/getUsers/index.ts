import api from '@/utils/api';
import type { UserDTOType, UserType } from '@/types';

export const getUsers = async (rq: UserDTOType): Promise<UserType[]> => {
  return await api.get<UserDTOType, UserType[]>('/users/get-users', rq);
};
