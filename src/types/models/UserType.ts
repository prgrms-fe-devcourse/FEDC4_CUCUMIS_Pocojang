import type {
  PostType,
  LikeType,
  MessageType,
  FollowType,
  NotificationType,
} from '../';
export interface UserType {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: PostType[];
  likes: LikeType[];
  comments: string[];
  followers: FollowType[];
  following: FollowType[];
  notifications: NotificationType[];
  messages: MessageType[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}
