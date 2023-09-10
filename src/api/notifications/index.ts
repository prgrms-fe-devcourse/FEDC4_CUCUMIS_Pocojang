import api from '@/utils/api';
import type { NotificationType } from '@/types';

export const callNotifications = async (): Promise<NotificationType[]> => {
  return await api.get<null, NotificationType[]>('/notifications');
};
