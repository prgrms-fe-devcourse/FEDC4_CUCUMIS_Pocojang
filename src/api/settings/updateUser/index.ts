import api from '@/utils/api';
import { RequestBodyUpdateUserType } from '@/types/api/settings/updateUser/RequestBodyUpdateUserType';
import { UserType } from '@/types';

export const updateUser = async (
  rq: RequestBodyUpdateUserType,
): Promise<UserType> => {
  return await api.put<RequestBodyUpdateUserType, UserType>(
    'settings/update-user',
    rq,
  );
};
