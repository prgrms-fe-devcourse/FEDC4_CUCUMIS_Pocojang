import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      const { nextIsLogin } = action.payload;
      state.isLogin = nextIsLogin;
    },
  },
});
