import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { dmReducer } from '@/stores/dm';

export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  dm: dmReducer,
});
