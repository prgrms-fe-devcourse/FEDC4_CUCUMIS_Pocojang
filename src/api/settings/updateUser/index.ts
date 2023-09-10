import api from "@/utils/api";
import type { RequestBodyUpdatePwType } from "@/types/api/settings/updatePassword/RequestBodyUpdatePwType";

export const updateUser = async (rq: RequestBodyUpdatePwType) : Promise<null> => {
  return await api.post<RequestBodyUpdatePwType, null>("/settings/update-user", rq);
};