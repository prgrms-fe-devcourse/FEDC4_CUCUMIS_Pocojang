import { useEffect } from 'react';

import { signup } from '@/api/auth';
import { ResponseSignupType } from '@/types/api/auth';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import validation from '@/utils/validations';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setSignupFormValues, signupFormValuesSelector } from '@/stores/signup';

const validateSignupForm = ({
  email,
  password,
  passwordConfirm,
  name,
}: FormValues) => {
  const newErrors: FormErrors = {};

  const emailErrorMessage = validation.email(email);
  const passwordErrorMessage = validation.password(password);
  const passwordConfirmErrorMessage = validation.passwordConfirm(
    password,
    passwordConfirm,
  );
  const nameErrorMessage = validation.name(name);

  if (emailErrorMessage) newErrors.email = emailErrorMessage;
  if (passwordErrorMessage) newErrors.password = passwordErrorMessage;
  if (passwordConfirmErrorMessage)
    newErrors.passwordConfirm = passwordConfirmErrorMessage;
  if (nameErrorMessage) newErrors.name = nameErrorMessage;

  return newErrors;
};

interface SignupFormHookParameters {
  onSuccess: (rs: ResponseSignupType) => void;
  onFail: (error: unknown) => void;
}

export const useSignupForm = ({
  onSuccess,
  onFail,
}: SignupFormHookParameters) => {
  const dispatch = useAppDispatch();
  const signupFormValues: FormValues = useAppSelector(signupFormValuesSelector);

  const onSubmitSignupForm = async ({ email, password, name }: FormValues) => {
    try {
      const rs = await signup({ email, password, fullName: name });
      onSuccess(rs);
    } catch (error) {
      onFail(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: signupFormValues,
    onSubmit: onSubmitSignupForm,
    validate: validateSignupForm,
  });

  useEffect(() => {
    dispatch(setSignupFormValues(values));
  }, [dispatch, values]);

  return {
    signupFormValues: values,
    signupFormErrors: errors,
    handleSignupFormChange: handleChange,
    handleSignupFormSubmit: handleSubmit,
  };
};
