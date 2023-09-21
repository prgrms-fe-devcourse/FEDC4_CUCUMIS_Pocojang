import { createSlice } from '@reduxjs/toolkit';

import type { NotificationType } from '@/types';

interface InitialState {
  notifications: Notification[];
}
const initialState: InitialState = {
  notifications: [],
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    handleClick: (state, { payload }) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification._id === payload && !notification.seen)
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
        return { _id, seen, name: fullName, type, notification };
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
interface post {
  title: string;
  channel: string;
}
interface like {
  post: post;
}

interface comment {
  post: post;
}

export interface Notification {
  seen: boolean;
  _id: string;
  name: string;
  type: string;
  like?: like;
  comment?: comment;
  notification: Notification;
}

const notificationCreateType = {
  follow: 'follow',
  like: 'like',
  message: 'message',
  comment: 'comment',
} as const;
