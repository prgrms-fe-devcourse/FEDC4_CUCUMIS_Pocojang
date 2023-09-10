import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';

export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
});
