import { useNavigate } from 'react-router-dom';

import BasicInput from '@/components/shared/input';
import SignupInputContainer from '@/components/signup/signupInputContainer';

export default function SignupPage() {
  const navigate = useNavigate();
  const handleClickNext = () => {
    navigate('/signup/step2');
  };

  return (
    <SignupInputContainer buttonText="다음" onSubmit={handleClickNext}>
      <BasicInput
        label="email"
        regExp="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
        errorMessage="영문, 숫자 포함 몇 자 이상 validation"
        isRequired
      />
      <BasicInput
        type="password"
        label="password"
        regExp="^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$"
        errorMessage="영문, 숫자 포함 몇 자 이상 validation"
        isRequired
      />
      <BasicInput
        label="password confirm"
        errorMessage="영문, 숫자 포함 몇 자 이상 validation"
        isRequired
      />
      <BasicInput
        label="name"
        regExp=""
        errorMessage="영문, 숫자 포함 몇 자 이상 validation"
        isRequired
      />
    </SignupInputContainer>
  );
}
