import type { RequestBodyDeleteFollowType } from "@/types/api/follow/delete/RequestBodyDeleteFollowType";
import type { FollowType } from "@/types";
import api from "@/utils/api";

export const unFollowUser = async (rq : RequestBodyDeleteFollowType): Promise<FollowType> => {
  return await api.del<RequestBodyDeleteFollowType, FollowType>("/follow/delete", rq);
};