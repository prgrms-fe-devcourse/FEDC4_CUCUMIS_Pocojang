import type { LoginResponseType } from '../login';
export interface SignupRequestType {
  email: string;
  fullName: string;
  password: string;
}

export interface SignupType extends LoginResponseType {}
