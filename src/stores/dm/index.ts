import { dmSlice } from '@/stores/dm/slice';

export const dmReducer = dmSlice.reducer;
export const { setMessages, addMessage } = dmSlice.actions;
