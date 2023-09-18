import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/stores';
import { LayoutState } from '@/stores/layout/slice';
import { getTitle, getHeaderType } from '@/utils/layout';
import { isLoginSelector, userIdSelector } from '@/stores/auth';

export const layoutSelector = (state: RootState): LayoutState => state.layout;
export const locationSelector = (state: RootState): string =>
  state.layout.location;
export const inputSelector = (state: RootState): string => state.layout.input;
export const visitingUserNameSelector = (state: RootState): string =>
  state.layout.visitingUser?.fullName ?? '';

export const headerTypeSelector = createSelector(
  locationSelector,
  userIdSelector,
  isLoginSelector,
  (location: string, userId: string, isLogin: boolean): string =>
    getHeaderType(location, userId, isLogin),
);

export const titleSelector = createSelector(
  locationSelector,
  userIdSelector,
  isLoginSelector,
  visitingUserNameSelector,
  (
    location: string,
    userId: string,
    isLogin: boolean,
    visitingUserName: string,
  ): string => getTitle(location, userId, isLogin, visitingUserName),
);
