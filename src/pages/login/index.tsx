import { useNavigate } from 'react-router-dom';

import LoginInputContainer from '@/components/login/loginInputContainer';
import BasicInput from '@/components/shared/input';
import { useLoginForm } from '@/components/login/useLoginForm';
import { useAuth } from '@/hooks/useAuth';
import { ResponseLoginType } from '@/types/api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const saveAuthData = useAuth();

  const { handleLoginFormChange, handleLoginFormSubmit } = useLoginForm({
    onSuccess: ({ token, user }: ResponseLoginType) => {
      saveAuthData(token, user);
      navigate('/', { replace: true });
    },
    onFail: (error: unknown) => {
      // TODO: 로그인 실패 알림 모달 출력
      console.error(error);
    },
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
