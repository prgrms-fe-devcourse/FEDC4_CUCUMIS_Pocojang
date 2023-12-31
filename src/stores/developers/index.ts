import { developersSlice } from '@/stores/developers/slice';

export const developersReducer = developersSlice.reducer;
export const {
  setSearchList,
  setDeveloperList,
  setOnlineUserList,
  cleanDeveloperList,
} = developersSlice.actions;
