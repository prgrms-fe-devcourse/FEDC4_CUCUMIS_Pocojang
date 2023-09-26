import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/stores';
import { AuthState } from '@/stores/auth/slice';
import type { FollowType, UserType } from '@/types';

export const authSelector = (state: RootState): AuthState => state.auth;
export const tokenSelector = (state: RootState): string =>
  state.auth.token ?? '';
export const userIdSelector = (state: RootState): string =>
  state.auth.user?._id ?? '';
export const userFullNameSelector = (state: RootState): string =>
  state.auth.user?.fullName ?? '';
export const userProfilePostIdSelector = (state: RootState): string =>
  state.auth.user?.username ?? '';
export const userFollowingSelector = (state: RootState): FollowType[] =>
  state.auth.user?.following ?? [];

export const userInfoSelector = (state: RootState): UserType | null =>
  state.auth.user ?? null;

export const isLoginSelector = createSelector(tokenSelector, (token: string) =>
  Boolean(token),
);
