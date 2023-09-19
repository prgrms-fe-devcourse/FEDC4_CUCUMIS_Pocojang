import { RootState } from '@/stores';
import { ConversationType, MessageType } from '@/types';

export const conversationsSelector = (state: RootState): ConversationType[] =>
  state.dm.conversations;
export const dmUserIdSelector = (state: RootState): string =>
  state.layout.visitingUser?._id ?? state.layout.location.split('/')[2];
export const messagesSelector = (state: RootState): MessageType[] =>
  state.dm.messages;
