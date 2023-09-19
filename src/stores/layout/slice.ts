import { createSlice } from '@reduxjs/toolkit';

import { UserType } from '@/types';

export interface LayoutState {
  location: string;
  input: string;
  visitingUser?: UserType;
}

const currentLocation = window.location.pathname;
const initialState: LayoutState = {
  location: currentLocation,
  input: '',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { nextLocation } = action.payload;
      state.location = nextLocation;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setVisitingUser: (state, action) => {
      state.visitingUser = action.payload;
    },
  },
});
