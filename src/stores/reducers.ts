import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { projectDetailReducer } from '@/stores/projectDetail';

export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  projectDetail: projectDetailReducer,
});
