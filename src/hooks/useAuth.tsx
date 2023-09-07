import type { RequestLoginType } from "../types/api/login/RequestLoginType"

export default function useAuth() {
  const login = async (loginRequest: RequestLoginType) => {
    const rs = await login(loginRequest); // TODO : ❗️CHECK => HOOK으로❗️
    console.log(rs);
  };

  return {
    login,
  };
}
