import { createSlice } from '@reduxjs/toolkit';

import { FormValues } from '@/hooks/useForm';

export interface SettingsProfileState {
  profileFormValues: FormValues;
}

const initialState: SettingsProfileState = {
  profileFormValues: {
    name: '',
    oneLiner: '',
    techStack: '',
    position: '',
    details: '',
  },
};

export const settingsProfileSlice = createSlice({
  name: 'settingsProfile',
  initialState,
  reducers: {
    setProfileFormValues: (state, action) => {
      const formValues = action.payload;
      if (!formValues) return;
      state.profileFormValues = formValues;
    },
  },
});
