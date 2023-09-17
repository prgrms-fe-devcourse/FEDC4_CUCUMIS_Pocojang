import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { developersReducer } from '@/stores/developers';
export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  developers: developersReducer,
});
