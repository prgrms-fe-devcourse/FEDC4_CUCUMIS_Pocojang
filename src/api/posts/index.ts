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

/**
 * createPost [ FormData Inputs ]
 * @title string
 * @image File | null
 * @channelId string
 */
export const createPost = async (request: FormData): Promise<PostType> =>
  api.post<FormData, PostType>('/posts/create', request);

export const getPost = async (postId: string): Promise<PostType> =>
  api.get<undefined, PostType>(`/posts/${postId}`);

/**
 * updatePost [ FormData Inputs ]
 * @postId string
 * @title string
 * @image File | null
 * @imageToDeletePublicId string | undefined
 * @channelId string
 * 이미지를 삭제하려면 imageToDeletePublicId 에 imagePublicId 전달
 */
export const updatePost = async (request: FormData): Promise<PostType> =>
  api.put<FormData, PostType>('/posts/update', request);

export const deletePost = async (request: RequestDeletePostType) =>
  api.del<RequestDeletePostType, undefined>('/posts/delete', request);
