import { createSlice } from '@reduxjs/toolkit';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';
import { getChannelPosts } from '@/api/posts';
import CHANNEL_ID from '@/consts/channels';
import { parseDeveloperPosts } from '@/components/developers/useDevelopers';

import { store } from '..';
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
interface Developers {
  DeveloperList: DeveloperType[];
  onlineUserList: OnlineUserType[];
}
const initialState: Developers = {
  DeveloperList: [],
  onlineUserList: [],
};

export const developersSlice = createSlice({
  name: 'developers',
  initialState,
  reducers: {
    setDeveloperList: (state, { payload }) => {
      const existingIds = state.DeveloperList.map((item) => item._id);
      const filtered = payload.filter(
        (item: DeveloperType) => !existingIds.includes(item._id),
      );
      state.DeveloperList = [...state.DeveloperList, ...filtered];
    },
    setSearchList: (state, { payload }) => {
      state.DeveloperList = payload;
    },
    setOnlineUserList: (state, { payload }) => {
      state.onlineUserList = payload;
    },
    initDeveloperList: () => {
      initDeveloperList();
    },
  },
});

const initDeveloperList = () => {
  getChannelPosts(CHANNEL_ID.DEVELOPER, { offset: 0, limit: 10 })
    .then(parseDeveloperPosts)
    .then((posts) =>
      store.dispatch(developersSlice.actions.setDeveloperList(posts)),
    );
};
initDeveloperList();
