import api from '@/utils/api';
import type { NotificationType } from '@/types';
import { RequestSendNotificationType } from '@/types/api/notifications';

export const getNotifications = async (): Promise<NotificationType[]> =>
  api.get<null, NotificationType[]>('/notifications');

export const readNotifications = async () => api.put('/notifications/seen');

export const sendNotification = async (
  rq: RequestSendNotificationType,
): Promise<NotificationType> =>
  api.post<RequestSendNotificationType, NotificationType>(
    '/notifications/create',
    rq,
  );
