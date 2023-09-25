import { createSlice } from '@reduxjs/toolkit';

export interface ProjectType {
  _id: string;
  image?: string;
  name: string;
  projectTitle: string;
}

interface InitialState {
  ProjectList: ProjectType[];
  isFetching: boolean;
}

const initialState: InitialState = {
  ProjectList: [],
  isFetching: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectList: (state, { payload }) => {
      state.ProjectList = [...state.ProjectList, ...payload];
    },

    setIsFetching: (state, { payload }) => {
      state.isFetching = payload;
    },

    setSearchList: (state, { payload }) => {
      state.ProjectList = payload;
    },
    cleanProjectList: (state) => {
      state.ProjectList = [];
    },
  },
});
