import { dmSlice } from '@/stores/dm/slice';
import * as selector from '@/stores/dm/selector';

export const dmReducer = dmSlice.reducer;
export const { setDMUserId, setMessages, addMessage } = dmSlice.actions;
export const { dmUserIdSelector, messagesSelector } = selector;