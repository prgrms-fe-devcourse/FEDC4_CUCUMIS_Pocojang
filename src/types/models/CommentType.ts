import type { UserType } from '../';
import BasicAvatarProps from '../components/BasicAvatarProps';
export interface CommentType {
  _id: string;
  comment: string;
  author: UserType;
  postId: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface FormattedComment {
  AvatarProps: BasicAvatarProps;
  userId: string;
  commentId: string;
  author: string;
  comment: string;
  isLastItem?: boolean;
  createdAt?: string;
}
