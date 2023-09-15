import { createSlice } from '@reduxjs/toolkit';

import { FormValues } from '@/hooks/useForm';

export interface SignupState {
  signupFormValues: FormValues;
}

const initialState: SignupState = {
  signupFormValues: {
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
      state.signupFormValues = formValues;
    },
  },
});
