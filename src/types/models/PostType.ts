import { LikeType } from './LikeType';
import { ChannelType } from './ChannelType';
import { CommentType, FormattedComment, UserType } from '../';

export interface PostType {
  likes: LikeType[];
  comments: CommentType[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface FormattedPost {
  likes: LikeType[];
  comments: FormattedComment[];
  postId: string;
  image?: string;
  author: Partial<UserType>;
  createdAt: string;
  updatedAt: string;
  contents: {
    title?: string;
    requirements?: string;
    oneLiner?: string;
    techStack?: string[];
    position?: string;
    details?: string;
  };
}

export interface ProjectContent {
  title?: string;
  requirements?: string;
}

export interface DeveloperContent {
  oneLiner?: string;
  techStack?: string[];
  position?: string;
  details?: string;
}
