import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  userId: string;
}

const initialState: AuthState = {
  token: '',
  userId: '1',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});
