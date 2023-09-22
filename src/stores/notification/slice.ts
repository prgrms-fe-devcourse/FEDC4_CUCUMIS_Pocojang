import { createSlice } from '@reduxjs/toolkit';

import { notificationCreateType } from '@/consts/notificationCreateType';
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
    readAllNotification: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        seen: true,
      }));
    },
  },
});

const checkNotificationType = (notification: NotificationType): string => {
  for (const type in notificationCreateType) {
    if (Object.prototype.hasOwnProperty.call(notification, type)) return type;
  }
  return '';
};
interface follow {
  follower: string;
}
interface post {
  _id: string;
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
  follow?: follow;
  notification: Notification;
}
