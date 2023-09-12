import { useNavigate } from 'react-router-dom';

import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';
import LoginInputContainer from '@/components/login/loginInputContainer';
import BasicInput from '@/components/shared/input';

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
  const onSubmit = async (value: FormValues) => {
    // TODO: login api 호출
    console.log(value);

    navigate('/home');
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
