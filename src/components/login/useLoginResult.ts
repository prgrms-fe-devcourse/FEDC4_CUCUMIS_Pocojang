import { setAuth, setUser } from '@/stores/auth';
import { useAppDispatch } from '@/stores/hooks';
import { ResponseLoginType } from '@/types/api/login';

interface LoginResultHookParameters {
  navigateToHome: () => void;
}

export const useLoginResult = ({
  navigateToHome,
}: LoginResultHookParameters) => {
  const dispatch = useAppDispatch();

  const saveAuthData = ({ user, token }: ResponseLoginType) => {
    dispatch(setAuth(token));
    dispatch(setUser(user));
  };

  const handleLoginSuccess = (rs: ResponseLoginType) => {
    saveAuthData(rs);
    navigateToHome();
  };

  const handleLoginFail = (error: unknown) => {
    console.error(error);
  };

  return {
    handleLoginSuccess,
    handleLoginFail,
  };
};
