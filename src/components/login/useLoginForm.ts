import { login } from '@/api/auth';
import { ResponseLoginType } from '@/types/api/auth';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';

const initialLoginFormValues: FormValues = {
  email: '',
  password: '',
};

const validateLoginForm = ({ email, password }: FormValues): FormErrors => {
  const newErrors: FormErrors = {};
  if (!email) newErrors.email = 'please enter email';
  if (!password) newErrors.password = 'please enter password';
  return newErrors;
};

interface LoginFormHookParameters {
  onSuccess: (rs: ResponseLoginType) => void;
  onFail: (error: unknown) => void;
}

export const useLoginForm = ({
  onSuccess,
  onFail,
}: LoginFormHookParameters) => {
  const onSubmitLoginForm = async ({ email, password }: FormValues) => {
    try {
      const rs = await login({ email, password });
      onSuccess(rs);
    } catch (error) {
      // TODO: 로그인 실패 알림
      onFail(error);
    }
  };

  const { handleChange, handleSubmit } = useForm({
    initialValues: initialLoginFormValues,
    onSubmit: onSubmitLoginForm,
    validate: validateLoginForm,
  });

  return {
    handleLoginFormChange: handleChange,
    handleLoginFormSubmit: handleSubmit,
  };
};
