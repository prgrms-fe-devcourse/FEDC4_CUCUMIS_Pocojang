import type { UserType } from '@/types';

export interface RequestLoginType {
  email: string;
  password: string;
}

export interface ResponseLoginType {
  user: UserType;
  token: string;
}

export interface RequestSignupType {
  email: string;
  fullName: string;
  password: string;
}

export interface ResponseSignupType {
  user: UserType;
  token: string;
}

export interface ResponseCheckAuthType {
  user: UserType;
}
