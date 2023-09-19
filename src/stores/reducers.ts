import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { signupReducer } from '@/stores/signup';
import { notificationReducer } from '@/stores/notification';
export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  signup: signupReducer,
  notifications: notificationReducer,
};
