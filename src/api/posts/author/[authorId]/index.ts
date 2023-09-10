import api from "@/utils/api";
import type { UserDTOType, PostType } from "@/types";

export const getAuthorPosts = async (
  rq: UserDTOType,
): Promise<PostType[]> => {
  return await api.get<UserDTOType, PostType[]>("/posts/author/:authorId", rq);
};