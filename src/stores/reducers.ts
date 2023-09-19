import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { projectDetailReducer } from '@/stores/projectDetail';
import { signupReducer } from '@/stores/signup';
import { dmReducer } from '@/stores/dm';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  projectDetail: projectDetailReducer,
  signup: signupReducer,
  dm: dmReducer,
};
