import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
};
