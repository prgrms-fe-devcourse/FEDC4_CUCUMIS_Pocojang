import type { UserType } from '@/types';

import { RootState } from '..';
import { ProfileState } from './slice';

export const myAccountSelector = (state: RootState): UserType | undefined =>
  state.profile.myAccount;
export const userSelector = (state: RootState): UserType | undefined =>
  state.profile.userAccount;
export const buttonStateSelector = (state: RootState): boolean | undefined =>
  state.profile.buttonState;
export const navigationTabSelector = (state: RootState): string | number =>
  state.profile.navigationTab;
export const selectedFileSelector = (state: RootState): File | null =>
  state.profile.selectedFile;
export const loadingSelector = (state: RootState): boolean =>
  state.profile.loading;
export const fileNameSelector = (state: RootState): string | null =>
  state.profile.fileName;

export const profileSelector = (state: RootState): ProfileState =>
  state.profile;
