import { signup } from '@/api/auth/signup';
import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';
import { ResponseSignupType } from '@/types/api/signup';
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
      // TODO: 회원가입 실패 알림
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
