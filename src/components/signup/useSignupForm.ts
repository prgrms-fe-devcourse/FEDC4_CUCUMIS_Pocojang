import { signup } from '@/api/auth';
import { ResponseSignupType } from '@/types/api/auth';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import validation from '@/utils/validations';

const initialSignupFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
};

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
  const onSubmitSignupForm = async ({ email, password, name }: FormValues) => {
    try {
      const rs = await signup({ email, password, fullName: name });
      onSuccess(rs);
    } catch (error) {
      onFail(error);
    }
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: initialSignupFormValues,
    onSubmit: onSubmitSignupForm,
    validate: validateSignupForm,
  });

  return {
    signupFormErrors: errors,
    handleSignupFormChange: handleChange,
    handleSignupFormSubmit: handleSubmit,
  };
};
