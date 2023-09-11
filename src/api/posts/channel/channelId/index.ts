// 채널 목록 불러오기
import api from '@/utils/api';
import type { PostType, UserDTOType } from '@/types';

export const getChannelPosts = async (
  rq: UserDTOType,
  channelId: string,
): Promise<PostType[]> => {
  return await api.get<UserDTOType, PostType[]>(
    `/posts/channel/${channelId}`,
    rq,
  );
};
