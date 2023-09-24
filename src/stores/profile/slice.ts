import { createSlice } from '@reduxjs/toolkit';

import type { UserType } from '@/types';
import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';

export interface ProfileState {
  myAccount: UserType;
  userAccount?: UserType;
  buttonState?: boolean;
  navigationTab: number | string;
  selectedFile: File | null;
  loading: boolean;
  fileName: string | null;
}

const initialState: ProfileState = {
  myAccount: session.getItem(SESSION_STORAGE.USER) as UserType,
  userAccount: undefined,
  buttonState: false,
  navigationTab: 0,
  selectedFile: null,
  loading: false,
  fileName: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleButton: (state, { payload }) => {
      state.buttonState = payload;
    },
    increaseFollowers: (state) => {
      state.myAccount.followers.length += 1;
    },
    decreaseFollowers: (state) => {
      state.myAccount.followers.length -= 1;
    },
    increaseFollowing: (state) => {
      state.myAccount.following.length += 1;
    },
    decreaseFollowing: (state) => {
      state.myAccount.following.length -= 1;
    },
    updateImage: (state, { payload }) => {
      state.selectedFile = payload;
    },
    updateFileName: (state, { payload }) => {
      state.fileName = payload;
    },
    updateUserAccount: (state, { payload }) => {
      state.userAccount = payload;
    },
    updateMyAccount: (state, { payload }) => {
      state.myAccount = payload;
    },
    toggleLoading: (state, { payload }) => {
      state.loading = payload;
    },
    changeNavigationTab: (state, { payload }) => {
      state.navigationTab = payload;
    },
  },
});
