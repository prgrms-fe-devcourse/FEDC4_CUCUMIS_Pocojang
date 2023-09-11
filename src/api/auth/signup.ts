import type { RequestSignupType, ResponseSignupType } from '@/types/api/signup';
import api from '@/utils/api';

export const signup = async (
  rq: RequestSignupType,
): Promise<ResponseSignupType> => {
  return await api.post<RequestSignupType, ResponseSignupType>('login', rq);
};
