import { createSlice } from '@reduxjs/toolkit';

import { ConversationType, MessageType } from '@/types';

export interface DMState {
  conversations: ConversationType[];
  dmUserId: string;
  messages: MessageType[];
}

const initialState: DMState = {
  conversations: [],
  dmUserId: '',
  messages: [],
};

export const dmSlice = createSlice({
  name: 'dm',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setDMUserId: (state, action) => {
      state.dmUserId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});
