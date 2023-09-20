import { createSlice } from '@reduxjs/toolkit';

export interface ProjectType {
  _id: string;
  image?: string;
  name: string;
  projectTitle: string;
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: { list: [] as ProjectType[] },
  reducers: {
    setList: (state, { payload }) => {
      state.list = [...state.list, ...payload];
    },
  },
});
