import {
  RequestLoginType,
  ResponseLoginType,
  RequestSignupType,
  ResponseSignupType,
  ResponseCheckAuthType,
} from '@/types/api/auth';
import api from '@/utils/api';

export const login = async (
  request: RequestLoginType,
): Promise<ResponseLoginType> =>
  api.post<RequestLoginType, ResponseLoginType>('login', request);

export const signup = async (
  request: RequestSignupType,
): Promise<ResponseSignupType> =>
  api.post<RequestSignupType, ResponseSignupType>('signup', request);

export const logout = async () => api.post('logout');

export const checkAuth = async (): Promise<ResponseCheckAuthType> =>
  api.post<undefined, ResponseCheckAuthType>('auth-user');
