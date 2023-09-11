import api from '@/utils/api';
import type { RequestBodyCreateNotificationType } from '@/types/api/notifications/create/RequestBodyCreateNotificationType';
import type { NotificationType } from '@/types';

export const sendNotifications = async (
  rq: RequestBodyCreateNotificationType,
): Promise<NotificationType> => {
  return await api.post<RequestBodyCreateNotificationType, NotificationType>(
    '/notifications/create',
    rq,
  );
};
