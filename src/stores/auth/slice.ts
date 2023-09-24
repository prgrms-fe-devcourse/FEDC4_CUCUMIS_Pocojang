import { createSlice } from '@reduxjs/toolkit';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';
import { UserType } from '@/types';

export interface AuthState {
  token?: string;
  user?: UserType;
}

const initialState: AuthState = {
  token: session.getItem(SESSION_STORAGE.TOKEN) ?? undefined,
  user: (session.getItem(SESSION_STORAGE.USER) as UserType) ?? undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const token = action.payload;
      if (!token) return;
      state.token = token;
    },
    setUser: (state, action) => {
      const user = action.payload;
      if (!user) return;
      state.user = user;
    },
    removeAuth: (state) => {
      state.token = undefined;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});
