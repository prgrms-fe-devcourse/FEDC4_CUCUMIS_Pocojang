import { signupSlice } from '@/stores/signup/slice';
import * as selector from '@/stores/signup/selector';

export const signupReducer = signupSlice.reducer;
export const { setSignupFormValues, setExtraInputFormValues } =
  signupSlice.actions;
export const { signupFormValuesSelector, extraInputFormValuesSelector } =
  selector;
