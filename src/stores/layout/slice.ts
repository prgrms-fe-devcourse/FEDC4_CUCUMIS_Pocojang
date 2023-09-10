import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  location: string;
}

const initialState: LayoutState = {
  location: '/',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { nextLocation } = action.payload;
      state.location = nextLocation;
    },
  },
});
