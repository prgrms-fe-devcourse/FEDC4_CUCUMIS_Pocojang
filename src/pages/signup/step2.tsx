import BasicInput from '@/components/shared/input';
import SignupInputContainer from '@/components/signup/signupInputContainer';

export default function ExtraInformationPage() {
  const handleClickSignup = () => {};

  return (
    <SignupInputContainer
      buttonText="건너뛰고 회원가입"
      onSubmit={handleClickSignup}
    >
      <BasicInput
        type="search"
        label="One liner"
        regExp="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
        errorMessage="몇 자 이상 validation"
      />
      <BasicInput
        type="search"
        label="Technical Tools(option)"
        errorMessage="기술 스택 리스트"
      />
      <BasicInput type="password confirm" label="Technical Position(option)" />
      <BasicInput type="name" label="Details(option)" />
    </SignupInputContainer>
  );
}
