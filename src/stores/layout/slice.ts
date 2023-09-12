import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  location: string;
  input: string;
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
  },
});
