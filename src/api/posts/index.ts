import api from '@/utils/api';
import { PaginationType, PostType } from '@/types';
import { RequestDeletePostType } from '@/types/api/posts';

export const getChannelPosts = async (
  channelId: string,
  request: PaginationType,
): Promise<PostType[]> =>
  api.get<PaginationType, PostType[]>(`/posts/channel/${channelId}`, request);

export const getAuthorPosts = async (
  authorId: string,
  request: PaginationType,
): Promise<PostType[]> =>
  api.get<PaginationType, PostType[]>(`/posts/author/${authorId}`, request);

export const createPost = async (request: FormData): Promise<PostType> =>
  api.post<FormData, PostType>('/posts/create', request);

export const getPost = async (postId: string): Promise<PostType> =>
  api.get<undefined, PostType>(`/posts/${postId}`);

export const updatePost = async (request: FormData): Promise<PostType> =>
  api.put<FormData, PostType>('/posts/update', request);

export const deletePost = async (request: RequestDeletePostType) =>
  api.del<RequestDeletePostType, undefined>('/posts/delete', request);
