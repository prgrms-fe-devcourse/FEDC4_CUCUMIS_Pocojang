import api from "@/utils/api";
import type { CommentType } from "@/types";
import type { RequestBodyCommentsType } from "@/types/api/comments/create/RequestBodyCommentsType";

export const createComments = async (rq : RequestBodyCommentsType): Promise<CommentType> => {
  return await api.post<RequestBodyCommentsType, CommentType>("/comments/create", rq);
};