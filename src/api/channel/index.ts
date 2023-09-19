import api from '@/utils/api';
import type { ChannelType } from '@/types';

export const getChannelInfo = async (
  channelName: string,
): Promise<ChannelType[]> =>
  api.get<undefined, ChannelType[]>(`/channel/${channelName}`);
