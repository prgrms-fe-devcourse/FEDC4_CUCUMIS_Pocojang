import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  location: string;
  title: string;
}

const initialState: LayoutState = {
  location: '/',
  title: 'home',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { nextLocation } = action.payload;
      state.location = nextLocation;
    },
    setTitle: (state, action) => {
      const { nextTitle } = action.payload;
      state.title = nextTitle;
    },
  },
});
