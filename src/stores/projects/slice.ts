import { createSlice } from '@reduxjs/toolkit';

export interface ProjectType {
  _id: string;
  imageUrl?: string;
  name: string;
  projectTitle: string;
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: { list: [] as ProjectType[] },
  reducers: {
    setList: (state, { payload }) => {
      state.list = payload;
    },
  },
});
