import api from "@/utils/api";
import type { UserType } from "@/types";

export const authUser = async (): Promise<UserType> => {
  return await api.get<null, UserType>("/auth-user");
};