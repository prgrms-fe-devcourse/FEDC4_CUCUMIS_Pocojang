import { createSlice } from '@reduxjs/toolkit';

import { MessageType } from '@/types';

export interface DMState {
  dmUserId: string;
  messages: MessageType[];
}

const initialState: DMState = {
  dmUserId: '',
  messages: [],
};

export const dmSlice = createSlice({
  name: 'dm',
  initialState,
  reducers: {
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
