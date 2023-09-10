import api from '@/utils/api';
import type { RequestLoginType, ResponseLoginType } from '@/types/api/login';

export const login = async (
  rq: RequestLoginType,
): Promise<ResponseLoginType> => {
  return await api.post<RequestLoginType, ResponseLoginType>('login', rq);
};
