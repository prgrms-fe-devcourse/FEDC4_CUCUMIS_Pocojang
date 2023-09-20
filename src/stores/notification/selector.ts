import { Notification } from '@/stores/notification/slice';

import { RootState } from '..';

export const notificationSelector = (state: RootState): Notification[] =>
  state.notifications.notifications;
