import { LoginResponseType } from '@/types/api/login';

export interface SignupRequestType {
  email: string;
  fullName: string;
  password: string;
}

export interface SignupResponseType extends LoginResponseType {}
