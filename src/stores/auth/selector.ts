import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/stores';
import { AuthState } from '@/stores/auth/slice';

export const authSelector = (state: RootState): AuthState => state.auth;
export const tokenSelector = (state: RootState): string => state.auth.token;
export const userIdSelector = (state: RootState): string => state.auth.userId;

export const isLoginSelector = createSelector(tokenSelector, (token: string) =>
  Boolean(token),
);
