import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { signupReducer } from '@/stores/signup';
import { dmReducer } from '@/stores/dm';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  signup: signupReducer,
  dm: dmReducer,
};
