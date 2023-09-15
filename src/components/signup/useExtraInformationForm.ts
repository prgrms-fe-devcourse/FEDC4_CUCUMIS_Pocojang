import { useEffect } from 'react';

import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  extraInformationValuesSelector,
  setExtraInputFormValues,
} from '@/stores/signup';

const validateExtraInformationForm = ({
  oneLiner,
  technicalTools,
  position,
  details,
}: FormValues): FormErrors => {
  const newErrors: FormErrors = {};

  if (!oneLiner) newErrors.oneLiner = 'please enter oneLiner';
  if (!technicalTools) newErrors.technicalTools = 'please enter technicalTools';
  if (!position) newErrors.position = 'please enter position';
  if (!details) newErrors.details = 'please enter details';

  return newErrors;
};

interface SignupFormHookParameters {
  // TODO: create post response type 으로 바꾸기
  onSuccess: (rs: unknown) => void;
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

  const onSubmitExtraInformationForm = async ({
    oneLiner,
    technicalTools,
    position,
    details,
  }: FormValues) => {
    try {
      console.log(oneLiner, technicalTools, position, details);
      // TODO: posts api 를 사용하여 프로필 게시글 작성
      // const rs = post({oneLiner, technicalTools, position, details})
      onSuccess('rs');
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
