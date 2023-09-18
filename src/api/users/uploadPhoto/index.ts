import api from '@/utils/api';
import type { UserType } from '@/types';

export const uploadPhoto = async (rq: FormData): Promise<UserType> => {
  return await api.post<FormData, UserType>('users/upload-photo', rq);
};
