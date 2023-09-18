import api from '@/utils/api';
import type { FollowType } from '@/types';
import {
  RequestFollowUserType,
  RequestUnFollowUserType,
} from '@/types/api/follow';

export const followUser = async (
  request: RequestFollowUserType,
): Promise<FollowType> =>
  api.post<RequestFollowUserType, FollowType>('/follow/create', request);

export const unFollowUser = async (
  request: RequestUnFollowUserType,
): Promise<FollowType> =>
  api.del<RequestUnFollowUserType, FollowType>('/follow/delete', request);
