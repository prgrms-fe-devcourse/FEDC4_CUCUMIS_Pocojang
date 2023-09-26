import { authSlice } from '@/stores/auth/slice';
import * as selector from '@/stores/auth/selector';

export const authReducer = authSlice.reducer;
export const { setAuth, setUser, removeAuth, removeUser } = authSlice.actions;
export const {
  authSelector,
  tokenSelector,
  userIdSelector,
  userFullNameSelector,
  isLoginSelector,
  userInfoSelector,
} = selector;
