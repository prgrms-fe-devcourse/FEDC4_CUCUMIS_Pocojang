import { RootState } from '@/stores';
import { MessageType } from '@/types';

export const dmUserIdSelector = (state: RootState): string => state.dm.dmUserId;
export const messagesSelector = (state: RootState): MessageType[] =>
  state.dm.messages;
