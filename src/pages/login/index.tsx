import { useNavigate } from 'react-router-dom';

import LoginInputContainer from '@/components/login/loginInputContainer';
import BasicInput from '@/components/shared/input';
import { useLoginForm } from '@/components/login/useLoginForm';
import { useLoginResult } from '@/components/login/useLoginResult';

export default function LoginPage() {
  const navigate = useNavigate();

  const { handleLoginSuccess, handleLoginFail } = useLoginResult({
    navigateToHome: () => {
      navigate('/', { replace: true });
    },
  });

  const { handleLoginFormChange, handleLoginFormSubmit } = useLoginForm({
    onSuccess: handleLoginSuccess,
    onFail: handleLoginFail,
  });

  const handleClickSignup = () => {
    navigate('/signup/step1');
  };

  return (
    <LoginInputContainer
      onSubmit={handleLoginFormSubmit}
      onClick={handleClickSignup}
    >
      <BasicInput
        label="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleLoginFormChange}
        isRequired
      />
      <BasicInput
        label="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleLoginFormChange}
        isRequired
      />
    </LoginInputContainer>
  );
}
