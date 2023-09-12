import { login } from '@/api/login';
import { ResponseLoginType } from '@/types/api/login';
import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';

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
  const handleSubmitLoginForm = async ({ email, password }: FormValues) => {
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
    onSubmit: handleSubmitLoginForm,
    validate: validateLoginForm,
  });

  return {
    handleLoginFormChange: handleChange,
    handleLoginFormSubmit: handleSubmit,
  };
};
