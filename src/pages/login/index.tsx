import { useNavigate } from 'react-router-dom';

import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';
import LoginInputContainer from '@/components/login/loginInputContainer';
import BasicInput from '@/components/shared/input';
import { login } from '@/api/login';
import { useAppDispatch } from '@/stores/hooks';
import { setAuth, setUserId } from '@/stores/auth';

const initialValues = {
  email: '',
  password: '',
};

const validate = ({ email, password }: FormValues): FormErrors => {
  const newErrors: FormErrors = {};
  if (!email) newErrors.email = 'please enter email';
  if (!password) newErrors.password = 'please enter password';
  return newErrors;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      const { user, token } = await login({ email, password });

      dispatch(setAuth(token));
      dispatch(setUserId(user._id));

      navigate('/', { replace: true });
    } catch (error) {
      // TODO: 로그인 실패 알림
      console.error(error);
    }
  };

  const handleClickSignup = () => {
    navigate('/signup/step1');
  };

  const { handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <LoginInputContainer onSubmit={handleSubmit} onClick={handleClickSignup}>
      <BasicInput
        label="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleChange}
        isRequired
      />
      <BasicInput
        label="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
        isRequired
      />
    </LoginInputContainer>
  );
}
