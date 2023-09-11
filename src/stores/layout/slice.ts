import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  location: string;
}

const currentLocation = window.location.pathname;
const initialState: LayoutState = {
  location: currentLocation,
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
