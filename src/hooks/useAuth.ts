import { removeAuth, removeUser, setAuth, setUser } from '@/stores/auth';
import { useAppDispatch } from '@/stores/hooks';
import { UserType } from '@/types';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const saveAuthData = (token: string, user: UserType) => {
    dispatch(setAuth(token));
    dispatch(setUser(user));
  };

  const removeAuthData = () => {
    dispatch(removeAuth());
    dispatch(removeUser());
  };

  return { saveAuthData, removeAuthData };
};
