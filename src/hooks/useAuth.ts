import { login } from '@/api/auth/login';
import { setAuth } from '@/stores/auth';
import { useAppDispatch } from '@/stores/hooks';
import type { RequestLoginType, ResponseLoginType } from '@/types/api/login';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // TODO: auth 를 가져올 때는 이렇게 쓰세요.
  // const auth = useAppSelector(authSelector);

  const onClickLogin = async (loginRequest: RequestLoginType) => {
    try {
      const rs: ResponseLoginType = await login(loginRequest);

      const { user, token } = rs;

      dispatch(setAuth({ user, token }));
    } catch (error) {
      console.error(error);
    }
  };

  return { onClickLogin };
};
