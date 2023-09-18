import { createSlice } from '@reduxjs/toolkit';

import { MessageType } from '@/types';

export interface DMState {
  messages: MessageType[];
}

const initialState: DMState = {
  messages: [],
};

export const dmSlice = createSlice({
  name: 'dm',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});
