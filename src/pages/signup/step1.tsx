import { useNavigate } from 'react-router-dom';

import SignupInputContainer from '@/components/signup/signupInputContainer';
import BasicInput from '@/components/shared/input';
import { useSignupForm } from '@/components/signup/useSignupForm';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
  const navigate = useNavigate();
  const saveAuthData = useAuth();

  const { signupFormErrors, handleSignupFormChange, handleSignupFormSubmit } =
    useSignupForm({
      onSuccess: ({ token, user }) => {
        saveAuthData(token, user);
        navigate('/signup/step2');
      },
      onFail: (error: unknown) => {
        console.error(error);
      },
    });

  return (
    <SignupInputContainer buttonText="다음" onSubmit={handleSignupFormSubmit}>
      <BasicInput
        label="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.email}
        isRequired
      />
      <BasicInput
        type="password"
        label="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.password}
        isRequired
      />
      <BasicInput
        label="password confirm"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.passwordConfig}
        isRequired
      />
      <BasicInput
        label="name"
        placeholder="이름을 입력해주세요"
        onChange={handleSignupFormChange}
        errorMessage={signupFormErrors.name}
        isRequired
      />
    </SignupInputContainer>
  );
}
