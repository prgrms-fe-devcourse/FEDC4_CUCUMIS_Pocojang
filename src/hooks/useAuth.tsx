import { LoginRequestType } from '@/types/api/login';

export default function useAuth() {
  const login = async (loginRequest: LoginRequestType) => {
    const rs = await login(loginRequest); // TODO : ❗️CHECK => HOOK으로❗️
    console.log(rs);
    // state.isLogin = ;
  };

  return {
    login,
  };
}
