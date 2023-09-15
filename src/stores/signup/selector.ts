import { RootState } from '@/stores';
import { SignupState } from '@/stores/signup/slice';
import { FormValues } from '@/hooks/useForm';

export const signupSelector = (state: RootState): SignupState => state.signup;
export const signupFormValuesSelector = (state: RootState): FormValues =>
  state.signup.signupFormValues;
export const extraInputFormValuesSelector = (state: RootState): FormValues =>
  state.signup.extraInputFormValues;
