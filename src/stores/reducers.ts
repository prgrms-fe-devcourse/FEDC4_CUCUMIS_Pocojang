import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { notificationReducer } from '@/stores/notification';
export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  notifications: notificationReducer,
});
