import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { signupReducer } from '@/stores/signup';
import { developersReducer } from '@/stores/developers';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  signup: signupReducer,
  developers: developersReducer,
};
