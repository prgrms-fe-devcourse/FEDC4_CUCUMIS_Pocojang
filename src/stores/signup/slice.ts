import { createSlice } from '@reduxjs/toolkit';

import { FormValues } from '@/hooks/useForm';

export interface SignupState {
  formValues: FormValues;
}

const initialState: SignupState = {
  formValues: {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  },
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupFormValues: (state, action) => {
      const formValues = action.payload;
      state.formValues = formValues;
    },
  },
});
