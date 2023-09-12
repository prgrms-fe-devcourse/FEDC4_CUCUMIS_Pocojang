import { createSlice } from '@reduxjs/toolkit';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';

export interface AuthState {
  token: string;
  userId: string;
}

const initialState: AuthState = {
  token: session.getItem(SESSION_STORAGE.TOKEN) ?? '',
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.userId = userId;
    },
  },
});
