import { updatePassword } from '@/api/settings';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import validation from '@/utils/validations';

const validatePasswordForm = ({ password, passwordConfirm }: FormValues) => {
  const newErrors: FormErrors = {};

  const passwordErrorMessage = validation.password(password);
  const passwordConfirmErrorMessage = validation.passwordConfirm(
    password,
    passwordConfirm,
  );

  if (passwordErrorMessage) newErrors.password = passwordErrorMessage;
  if (passwordConfirmErrorMessage)
    newErrors.passwordConfirm = passwordConfirmErrorMessage;

  return newErrors;
};

const initialPasswordFormValues = {
  password: '',
  passwordConfirm: '',
};

interface SettingsPasswordFormParameters {
  onSuccess: () => void;
  onFail: (error: unknown) => void;
}

const useSettingsPasswordForm = ({
  onSuccess,
  onFail,
}: SettingsPasswordFormParameters) => {
  const onSubmitPasswordForm = async ({ password }: FormValues) => {
    try {
      await updatePassword({ password });
      onSuccess();
    } catch (error) {
      onFail(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: initialPasswordFormValues,
    onSubmit: onSubmitPasswordForm,
    validate: validatePasswordForm,
  });

  return {
    passwordFormValues: values,
    passwordFormErrors: errors,
    handlePasswordFormChange: handleChange,
    handlePasswordFormSubmit: handleSubmit,
  };
};

export default useSettingsPasswordForm;
