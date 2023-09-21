import useForm, { FormErrors, FormValues } from '@/hooks/useForm';

const validateProfileForm = ({ oneLiner, details }: FormValues) => {
  const newErrors: FormErrors = {};

  if (oneLiner.length > 30) newErrors.oneLiner = '30자 미만 입력 가능합니다.';
  if (details.length > 1000) newErrors.details = '1000자 미만 입력 가능합니다.';

  return newErrors;
};

const initialProfileFormValues = {
  name: '',
  oneLiner: '',
  techStack: '',
  position: '',
  details: '',
};

interface SettingsProfileFormParameters {
  onSuccess: () => void;
  onFail: (error: unknown) => void;
}

const useSettingsProfileForm = ({
  onSuccess,
  onFail,
}: SettingsProfileFormParameters) => {
  const onSubmitProfileForm = async ({
    name,
    oneLiner,
    techStack,
    position,
    details,
  }: FormValues) => {
    try {
      // TODO: profile form 수정하기
      console.log(name, oneLiner, techStack, position, details);
      onSuccess();
    } catch (error) {
      onFail(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: initialProfileFormValues,
    onSubmit: onSubmitProfileForm,
    validate: validateProfileForm,
  });

  return {
    profileFormValues: values,
    profileFormErrors: errors,
    handleProfileFormChange: handleChange,
    handleProfileFormSubmit: handleSubmit,
  };
};

export default useSettingsProfileForm;
