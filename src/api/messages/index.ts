import api from '@/utils/api';
import type { MessageType } from '@/types';
import type { RequestParamsMessagesType } from '@/types/api/messages/RequestParamsMessagesType';

export const messagesList = async (
  rq: RequestParamsMessagesType,
): Promise<MessageType[]> => {
  return await api.get<RequestParamsMessagesType, MessageType[]>(
    '/messages',
    rq,
  );
};
