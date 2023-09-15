import { useEffect } from 'react';

import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  extraInformationValuesSelector,
  setExtraInputFormValues,
} from '@/stores/signup';
import { updateUser } from '@/api/settings/updateUser';
import { userFullNameSelector } from '@/stores/auth';
import { UserType } from '@/types';

const validateExtraInformationForm = ({
  oneLiner,
  techStack,
  position,
  details,
}: FormValues): FormErrors => {
  const newErrors: FormErrors = {};

  if (!oneLiner) newErrors.oneLiner = 'please enter oneLiner';
  if (!techStack) newErrors.techStack = 'please enter technicalTools';
  if (!position) newErrors.position = 'please enter position';
  if (!details) newErrors.details = 'please enter details';

  return newErrors;
};

interface SignupFormHookParameters {
  onSuccess: (rs: UserType) => void;
  onFail: (error: unknown) => void;
}

export const useExtraInformationForm = ({
  onSuccess,
  onFail,
}: SignupFormHookParameters) => {
  const dispatch = useAppDispatch();
  const extraInputFormValues: FormValues = useAppSelector(
    extraInformationValuesSelector,
  );
  const fullName = useAppSelector(userFullNameSelector);

  const onSubmitExtraInformationForm = async (formValues: FormValues) => {
    try {
      const userData = JSON.stringify(formValues);
      const rs = await updateUser({
        fullName,
        username: userData,
      });
      onSuccess(rs);
    } catch (error) {
      onFail(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: extraInputFormValues,
    onSubmit: onSubmitExtraInformationForm,
    validate: validateExtraInformationForm,
  });

  useEffect(() => {
    dispatch(setExtraInputFormValues(values));
  }, [dispatch, values]);

  return {
    extraInformationFormValues: values,
    extraInformationFormErrors: errors,
    handleExtraInformationFormChange: handleChange,
    handleExtraInformationFormSubmit: handleSubmit,
  };
};
