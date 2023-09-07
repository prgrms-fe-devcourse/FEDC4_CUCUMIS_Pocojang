import type { UserType } from '../';
export interface ConversationType {
  _id: string[];
  message: string;
  sender: UserType;
  receiver: UserType;
  seen: boolean;
  createdAt: string;
}
