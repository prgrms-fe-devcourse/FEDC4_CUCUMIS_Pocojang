import { createSlice } from '@reduxjs/toolkit';

import type { NotificationType } from '@/types';

export interface Notification {
  isSeen: boolean;
  _id: string;
  name: string;
  type: string;
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notifications: [] as Notification[] },
  reducers: {
    handleClick: (state, { payload }) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification._id === payload && !notification.isSeen)
          return { ...notification, isSeen: true };
        return notification;
      });
    },

    setNotification: (state, { payload }) => {
      state.notifications = payload.map((notification: NotificationType) => {
        const {
          _id,
          seen,
          author: { fullName },
        } = notification;
        const type = checkNotificationType(notification);
        return { _id, isSeen: seen, name: fullName, type };
      });
    },
  },
});

const checkNotificationType = (notification: NotificationType): string => {
  for (const type in notificationCreateType) {
    if (Object.prototype.hasOwnProperty.call(notification, type)) return type;
  }
  return '';
};

const notificationCreateType = {
  follow: 'follow',
  like: 'like',
  message: 'message',
  comment: 'comment',
} as const;
