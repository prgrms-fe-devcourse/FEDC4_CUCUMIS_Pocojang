import { UserType } from '@/types';
import {
  RequestUpdatePasswordType,
  RequestUpdateUserType,
} from '@/types/api/settings';
import api from '@/utils/api';

export const updateUser = async (
  request: RequestUpdateUserType,
): Promise<UserType> =>
  api.put<RequestUpdateUserType, UserType>('/settings/update-user', request);

export const updatePassword = async (
  request: RequestUpdatePasswordType,
): Promise<undefined> =>
  api.put<RequestUpdatePasswordType, undefined>(
    '/settings/update-password',
    request,
  );
