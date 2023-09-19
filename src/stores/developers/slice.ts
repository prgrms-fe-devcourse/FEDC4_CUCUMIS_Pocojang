import { createSlice } from '@reduxjs/toolkit';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';

//TODO 타입정리 전체적으로
export interface DeveloperType {
  _id: string;
  oneLiner: string;
  name: string;
  techStack: string[];
  AvatarProps: BasicAvatarProps;
  description: string;
}
export interface OnlineUserType {
  _id: string;
  label: string;
  AvatarProps: BasicAvatarProps;
}

export const developersSlice = createSlice({
  name: 'developers',
  initialState: {
    DeveloperList: [] as DeveloperType[],
    onlineUserList: [] as OnlineUserType[],
  },
  reducers: {
    setDeveloperList: (state, { payload }) => {
      state.DeveloperList = payload;
    },
    setOnlineUserList: (state, { payload }) => {
      state.onlineUserList = payload;
    },
  },
});