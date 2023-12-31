import { LinearProgress } from '@mui/material';

import SettingsInputContainer from '@/components/settings/SettingsInputContainer';
import useSettingsProfileForm from '@/components/settings/profile/useSettingsProfileForm';
import BasicInput from '@/components/shared/input';

export default function ProfileSettingPage() {
  const {
    isLoading,
    profileFormDefaultValues,
    profileFormErrors,
    handleProfileFormChange,
    handleProfileFormSubmit,
  } = useSettingsProfileForm({
    onSuccess: () => {
      console.log('profile change success');
    },
    onFail: (error: unknown) => {
      // TODO: 회원가입 실패 알림 모달 출력
      console.error(error);
    },
  });
  return isLoading ? (
    <LinearProgress />
  ) : (
    <SettingsInputContainer onSubmit={handleProfileFormSubmit}>
      <BasicInput
        label="name"
        placeholder="이름을 입력해주세요"
        defaultValue={profileFormDefaultValues.name}
        onChange={handleProfileFormChange}
        errorMessage={profileFormErrors.name}
        isRequired={true}
      />
      <BasicInput
        label="oneLiner"
        placeholder="한 줄 포부를 작성해주세요"
        defaultValue={profileFormDefaultValues.oneLiner}
        onChange={handleProfileFormChange}
        errorMessage={profileFormErrors.oneLiner}
        isRequired={true}
      />
      <BasicInput
        label="techStack"
        placeholder="기술 스택을 추가해주세요"
        defaultValue={profileFormDefaultValues.techStack}
        onChange={handleProfileFormChange}
        errorMessage={profileFormErrors.techStack}
        isRequired={false}
      />
      <BasicInput
        label="position"
        placeholder="직군을 입력해주세요"
        defaultValue={profileFormDefaultValues.position}
        onChange={handleProfileFormChange}
        errorMessage={profileFormErrors.position}
        isRequired={false}
      />
      <BasicInput
        label="details"
        placeholder="소개글을 작성해주세요"
        defaultValue={profileFormDefaultValues.details}
        onChange={handleProfileFormChange}
        errorMessage={profileFormErrors.details}
        isRequired={false}
      />
    </SettingsInputContainer>
  );
}
