import api from '@/utils/api';
import type { MessageType } from '@/types';
import type { RequestParamsMessagesType } from '@/types/api/messages/RequestParamsMessagesType';

export const messagesList = async (
  rq: RequestParamsMessagesType,
): Promise<MessageType> => {
  return await api.post<RequestParamsMessagesType, MessageType>(
    '/messages/conversations',
    rq,
  );
};
