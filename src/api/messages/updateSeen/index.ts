import api from '@/utils/api';
import type { RequestBodyUpdateMessagesType } from '@/types/api/messages/updateSeen/RequestBodyUpdateMessagesType';

export const seenMessage = async (
  rq: RequestBodyUpdateMessagesType,
): Promise<null> => {
  return await api.post<RequestBodyUpdateMessagesType, null>(
    '/messages/create',
    rq,
  );
};
