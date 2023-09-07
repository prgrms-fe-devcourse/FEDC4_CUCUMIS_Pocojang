import type { UserType } from '../';
export interface CommentType {
  _id: string;
  comment: string;
  author: UserType;
  postId: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}
