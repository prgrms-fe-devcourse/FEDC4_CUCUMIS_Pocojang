import { RootState } from '@/stores';
import { MessageType } from '@/types';

export const messagesSelector = (state: RootState): MessageType[] =>
  state.dm.messages;
