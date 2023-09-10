import { LikeType } from './LikeType';
import { ChannelType } from './ChannelType';
import { UserType } from '../';
export interface PostType {
  likes: LikeType[];
  comments: Comment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
}
