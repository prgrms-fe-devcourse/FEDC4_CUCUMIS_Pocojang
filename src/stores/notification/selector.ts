import { NotificationsStateType } from '@/stores/notification/slice';

import { RootState } from '..';

export const notificationSelector = (
  state: RootState,
): NotificationsStateType[] => state.notifications.notifications;
