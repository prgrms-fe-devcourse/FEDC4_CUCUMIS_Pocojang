import { developersSlice } from '@/stores/developers/slice';

export const developersReducer = developersSlice.reducer;
export const { setDeveloperList, setOnlineUserList } = developersSlice.actions;
