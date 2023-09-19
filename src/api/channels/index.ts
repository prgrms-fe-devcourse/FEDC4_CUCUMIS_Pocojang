// 채널 목록 불러오기
import api from '@/utils/api';
import type { ChannelType } from '@/types';
import { RequestCreateChannelType } from '@/types/api/channels';

export const getChannels = async (): Promise<ChannelType[]> =>
  api.get<undefined, ChannelType[]>('/channels');

export const createChannel = async (request: RequestCreateChannelType) =>
  api.post<RequestCreateChannelType, undefined>('/channels/create', request);
