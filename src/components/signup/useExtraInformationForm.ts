import { useEffect } from 'react';

import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  extraInformationValuesSelector,
  setExtraInputFormValues,
} from '@/stores/signup';
import { PostType } from '@/types';
import { createPost } from '@/api/posts/create';
import CHANNEL_ID from '@/consts/channels';

const validateExtraInformationForm = ({
  oneLiner,
  details,
}: FormValues): FormErrors => {
  const newErrors: FormErrors = {};

  if (oneLiner.length > 30) newErrors.oneLiner = '30자 미만 입력 가능합니다.';
  if (details.length > 1000) newErrors.details = '1000자 미만 입력 가능합니다.';

  return newErrors;
};

interface SignupFormHookParameters {
  onSuccess: (rs: PostType) => void;
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

  const onSubmitExtraInformationForm = async (formValues: FormValues) => {
    try {
      const userData = JSON.stringify(formValues);
      const rs = await createPost({
        title: userData,
        channelId: CHANNEL_ID.DEVELOPER,
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
