
import api from '@/utils/api';
import type { RequestChannelType } from '@/types/api/channels/create/RequestChannelType';

export const createChennel = async (rq: RequestChannelType): Promise<null> => {
  return await api.post<RequestChannelType, null>('/channels/create', rq);
};

