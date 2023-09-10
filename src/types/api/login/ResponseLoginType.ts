import type { UserType } from '@/types';

export interface ResponseLoginType {
  user: UserType;
  token: string;
}
