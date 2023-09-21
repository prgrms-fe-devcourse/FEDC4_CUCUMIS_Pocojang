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
      //TODO중복 되는 사항 제거 함수로 뺴기
      const list = state.DeveloperList as DeveloperType[];
      const filterd = filterExistingIds(list, payload);
      state.DeveloperList = [...state.DeveloperList, ...filterd];
    },
    setSearchList: (state, { payload }) => {
      state.DeveloperList = payload;
    },
    setOnlineUserList: (state, { payload }) => {
      state.onlineUserList = payload;
    },
  },
});
//TODO: 리스너 만들기
//리스트 초기화

getChannelPosts(CHANNEL_ID.DEVELOPER, { offset: 0, limit: 10 })
  .then(parseDeveloperPosts)
  .then((posts) =>
    store.dispatch(developersSlice.actions.setDeveloperList(posts)),
  );

const filterExistingIds = (
  list: DeveloperType[],
  payloadList: DeveloperType[],
) => {
  const existIds = list.map((item) => item._id);
  return payloadList.filter((item) => !existIds.includes(item._id));
};
