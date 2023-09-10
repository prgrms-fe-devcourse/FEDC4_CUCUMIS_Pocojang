import api from "@/utils/api";
import type { RequestBodyPostUpdateType } from "@/types/api/posts/update/RequestBodyPostUpdateType";
export const getPostId = async (
  rq: RequestBodyPostUpdateType,
): Promise<null> => {
  return await api.put<RequestBodyPostUpdateType, null>("/posts/update", rq);
};