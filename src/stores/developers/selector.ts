import { DeveloperType, OnlineUserType } from '@/stores/developers/slice';

import { RootState } from '..';

export const developerListSelector = (state: RootState): DeveloperType[] =>
  state.developers?.DeveloperList;
export const onlineUserListSelector = (state: RootState): OnlineUserType[] =>
  state.developers?.onlineUserList;
