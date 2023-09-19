import api from '@/utils/api';
import { UserType } from '@/types';
import { PaginationType } from '@/types/models/PaginationType';

export const getUsers = async (request: PaginationType): Promise<UserType[]> =>
  api.get<PaginationType, UserType[]>('users/get-users', request);

export const getOnlineUsers = async (): Promise<UserType[]> =>
  api.get<undefined, UserType[]>('users/online-users');

export const getUser = async (userId: string): Promise<UserType> =>
  api.get<undefined, UserType>(`/users/${userId}`);

/**
 * [ FormData Inputs ]
 * @isCover string
 * @image File
 * 프로필 이미지 변경 시 isCover 값으로 'false', 커버 이미지 변경 시 isCover 값으로 'true' 전달
 */
export const uploadUserPhoto = async (request: FormData): Promise<UserType> =>
  api.post<FormData, UserType>('/users/upload-photo', request);
