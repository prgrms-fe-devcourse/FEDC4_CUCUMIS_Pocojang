import { profileSlice } from './slice';
import * as selector from './selector';
export const profileReducer = profileSlice.reducer;
export const {
  toggleButton,
  increaseFollowers,
  decreaseFollowers,
  increaseFollowing,
  decreaseFollowing,
  updateImage,
  updateFileName,
  updateUserAccount,
  updateMyAccount,
  toggleLoading,
  changeNavigationTab,
} = profileSlice.actions;

export const {
  myAccountSelector,
  userSelector,
  buttonStateSelector,
  navigationTabSelector,
  selectedFileSelector,
  loadingSelector,
  profileSelector,
} = selector;
