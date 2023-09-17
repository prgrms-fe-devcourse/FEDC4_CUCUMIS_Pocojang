import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { projectsReducer } from '@/stores/projects';
export const reducers = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  projects: projectsReducer,
});
