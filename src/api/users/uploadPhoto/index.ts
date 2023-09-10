import api from '@/utils/api';
import type { UserType, FormType } from '@/types';

export const uploadPhoto = async (rq: FormType): Promise<UserType> => {
  return await api.post<FormType, UserType>('/users/upload-photo', rq);
};
