<<<<<<< HEAD
import { RootState } from '@/stores';
import { LayoutState } from '@/stores/layout/slice';

export const layoutSelector = (state: RootState): LayoutState => state.layout;
=======
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/stores';
import { LayoutState } from '@/stores/layout/slice';
import { getTitle } from '@/utils/layout';

export const layoutSelector = (state: RootState): LayoutState => state.layout;
export const locationSelector = (state: RootState): string =>
  state.layout.location;

export const titleSelector = createSelector(
  locationSelector,
  (location: string): string => getTitle(location),
);
>>>>>>> 158f1efd674cd58224abc013a3a1febf4564ac42
