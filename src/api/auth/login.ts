import { LoginRequestType, LoginResponseType } from '@/types/api/login';
import api from '@/utils/api';

export const login = async (
  rq: LoginRequestType,
): Promise<LoginResponseType> => {
  return await api.post<LoginRequestType, LoginResponseType>('login', rq);
};
