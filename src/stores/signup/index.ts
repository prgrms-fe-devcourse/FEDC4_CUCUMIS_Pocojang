import { signupSlice } from '@/stores/signup/slice';
import * as selector from '@/stores/signup/selector';

export const signupReducer = signupSlice.reducer;
export const { setSignupFormValues } = signupSlice.actions;
export const { signupSelector, signupFormValuesSelector } = selector;
