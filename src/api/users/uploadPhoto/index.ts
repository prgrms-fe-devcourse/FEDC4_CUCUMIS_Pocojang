import api from "@/utils/api";
import type { UserType, FormType } from "@/types";

export const authUser = async (
  rq: FormType,
): Promise<UserType> => {
  return await api.post<FormType, UserType>("/auth-user", rq);
};