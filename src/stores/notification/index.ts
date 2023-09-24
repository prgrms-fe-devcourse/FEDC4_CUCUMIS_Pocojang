import { notificationSlice } from '@/stores/notification/slice';

import * as selector from './selector';
export const notificationReducer = notificationSlice.reducer;
export const { setNotification, readAllNotification } =
  notificationSlice.actions;
export const { notificationSelector } = selector;
