import { useNavigate } from 'react-router-dom';

import SignupInputContainer from '@/components/signup/signupInputContainer';
import BasicInput from '@/components/shared/input';
import { useSignupForm } from '@/components/signup/useSignupForm';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
  const navigate = useNavigate();
  const { saveAuthData } = useAuth();

  const {
    signupFormValues,
    signupFormErrors,
    handleSignupFormChange,
    handleSignupFormSubmit,
  } = useSignupForm({
    onSuccess: ({ token, user }) => {
      saveAuthData(token, user);
      navigate('/signup/step2', { replace: true });
    },
    onFail: (error: unknown) => {
      // TODO: 회원가입 실패 알림 모달 출력
      console.error(error);
    },
  });

  return (
    <SignupInputContainer
      buttonText="회원가입"
      onSubmit={handleSignupFormSubmit}
    >
      <BasicInput
        label="email"
        placeholder="이메일을 입력해주세요"
        value={signupFormValues.email}
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.email}
        isRequired
      />
      <BasicInput
        type="password"
        label="password"
        placeholder="비밀번호를 입력해주세요"
        value={signupFormValues.password}
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.password}
        isRequired
      />
      <BasicInput
        type="password"
        label="passwordConfirm"
        placeholder="비밀번호 확인을 입력해주세요"
        value={signupFormValues.passwordConfirm}
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.passwordConfirm}
        isRequired
      />
      <BasicInput
        label="name"
        placeholder="이름을 입력해주세요"
        value={signupFormValues.name}
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.name}
        isRequired
      />
    </SignupInputContainer>
  );
}
