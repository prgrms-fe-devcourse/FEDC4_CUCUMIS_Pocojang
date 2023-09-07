import type { UserType } from '@/types';

export interface LoginRequestType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  user: UserType;
  token: string;
}
