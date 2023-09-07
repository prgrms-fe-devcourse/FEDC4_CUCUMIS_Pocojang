import type { UserType } from '../';
import type { CommentType } from './CommentType';

export interface NotificationType {
  seen: boolean;
  _id: string;
  author: UserType;
  user: UserType | string;
  post: null | string;
  follow?: string; // 사용자 id
  comment?: CommentType;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}
