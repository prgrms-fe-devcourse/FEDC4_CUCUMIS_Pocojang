import api from '@/utils/api';
import { PostType, UserType } from '@/types';

export const searchUser = async (query: string): Promise<UserType[]> =>
  api.get<undefined, UserType[]>(`/search/users/${query}`);

export const searchAll = async (
  query: string,
): Promise<(UserType | PostType)[]> =>
  api.get<null, (UserType | PostType)[]>(`/search/all/${query}`);
