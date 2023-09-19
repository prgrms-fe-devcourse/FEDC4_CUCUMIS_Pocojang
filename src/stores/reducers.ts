import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { signupReducer } from '@/stores/signup';
import { dmReducer } from '@/stores/dm';
import { developersReducer } from '@/stores/developers';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  signup: signupReducer,
  dm: dmReducer,
  developers: developersReducer,
};
