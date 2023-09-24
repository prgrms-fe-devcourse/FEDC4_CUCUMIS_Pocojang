import { RootState } from '@/stores';
import { MessageType } from '@/types';
import { ConversationDataType } from '@/stores/dm/slice';

export const conversationsSelector = (
  state: RootState,
): ConversationDataType[] => state.dm.conversations;
export const dmUserIdSelector = (state: RootState): string =>
  state.layout.visitingUser?._id ?? state.layout.location.split('/')[2];
export const messagesSelector = (state: RootState): MessageType[] =>
  state.dm.messages;
