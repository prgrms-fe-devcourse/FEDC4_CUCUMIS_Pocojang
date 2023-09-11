// 채널 목록 불러오기
import api from '@/utils/api';
import type { ChannelType } from '@/types';

export const getChannels = async (): Promise<ChannelType[]> => {
  return await api.get<null, ChannelType[]>('/channels');
};
