import { authSlice } from '@/stores/auth/slice';
import * as selector from '@/stores/auth/selector';

export const authReducer = authSlice.reducer;
export const { setIsLogin, setAuth } = authSlice.actions;
export const { authSelector } = selector;
