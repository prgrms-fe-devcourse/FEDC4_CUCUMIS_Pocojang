import type { RequestLoginType, ResponseLoginType } from '@/types/api/login';
import api from '@/utils/api';

export const login = async (
  rq: RequestLoginType,
): Promise<ResponseLoginType> => {
  return await api.post<RequestLoginType, ResponseLoginType>('login', rq);
};
