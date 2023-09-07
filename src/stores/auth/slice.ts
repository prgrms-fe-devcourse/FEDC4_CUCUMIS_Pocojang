import { createSlice } from '@reduxjs/toolkit';

import { UserType } from '@/types';

export interface AuthState {
  isLogin: boolean;
  token?: string;
  user?: UserType;
}

const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
    },
    setIsLogin: (state, action) => {
      const { nextIsLogin } = action.payload;
      state.isLogin = nextIsLogin;
    },
  },
});
