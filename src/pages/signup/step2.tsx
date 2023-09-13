import { useNavigate } from 'react-router-dom';

import SignupInputContainer from '@/components/signup/signupInputContainer';
import BasicInput from '@/components/shared/input';
import { useExtraInformationForm } from '@/components/signup/useExtraInformationForm';

export default function ExtraInformationPage() {
  const navigate = useNavigate();

  const {
    extraInformationFormErrors,
    handleExtraInformationFormChange,
    handleExtraInformationFormSubmit,
  } = useExtraInformationForm({
    onSuccess: () => {
      navigate('/');
    },
    onFail: (error: unknown) => {
      // TODO: 추가 정보 입력 실패 알림 모달 출력
      console.error(error);
      navigate('/');
    },
  });

  return (
    <SignupInputContainer
      buttonText="프로필 저장"
      onSubmit={handleExtraInformationFormSubmit}
    >
      <BasicInput
        label="oneLiner"
        placeholder="한 줄 포부를 작성해주세요"
        onChange={handleExtraInformationFormChange}
        errorMessage={extraInformationFormErrors.oneLiner}
        isRequired={false}
      />
      <BasicInput
        label="technicalTools"
        placeholder="기술 스택을 추가해주세요"
        onChange={handleExtraInformationFormChange}
        errorMessage={extraInformationFormErrors.technicalTools}
        isRequired={false}
      />
      <BasicInput
        label="position"
        placeholder="직군을 입력해주세요"
        onChange={handleExtraInformationFormChange}
        errorMessage={extraInformationFormErrors.position}
        isRequired={false}
      />
      <BasicInput
        label="details"
        placeholder="소개글을 작성해주세요"
        onChange={handleExtraInformationFormChange}
        errorMessage={extraInformationFormErrors.details}
        isRequired={false}
      />
    </SignupInputContainer>
  );
}
