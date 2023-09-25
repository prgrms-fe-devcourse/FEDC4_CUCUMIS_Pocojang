import { authReducer } from '@/stores/auth';
import { layoutReducer } from '@/stores/layout';
import { projectDetailReducer } from '@/stores/projectDetail';
import { signupReducer } from '@/stores/signup';
import { dmReducer } from '@/stores/dm';
import { notificationReducer } from '@/stores/notification';
import { projectsReducer } from '@/stores/projects';
import { developersReducer } from '@/stores/developers';
import { settingsProfileReducer } from '@/stores/settings/profile';

export const reducers = {
  auth: authReducer,
  layout: layoutReducer,
  projectDetail: projectDetailReducer,
  projects: projectsReducer,
  signup: signupReducer,
  dm: dmReducer,
  notifications: notificationReducer,
  developers: developersReducer,
  settingsProfile: settingsProfileReducer,
};
