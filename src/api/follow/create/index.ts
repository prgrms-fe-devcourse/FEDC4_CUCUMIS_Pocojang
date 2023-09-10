import type { RequestBodyCreateFollowType } from "@/types/api/follow/create/RequestBodyCreateFollowType";
import type { FollowType } from "@/types";
import api from "@/utils/api";

export const followUser = async (rq : RequestBodyCreateFollowType): Promise<FollowType> => {
  return await api.post<RequestBodyCreateFollowType, FollowType>("/follow/create", rq);
};