import SettingsInputContainer from '@/components/settings/SettingsInputContainer';
import useSettingsPasswordForm from '@/components/settings/password/useSettingsPasswordForm';
import BasicInput from '@/components/shared/input';

export default function PasswordSettingPage() {
  const {
    passwordFormValues,
    passwordFormErrors,
    handlePasswordFormChange,
    handlePasswordFormSubmit,
  } = useSettingsPasswordForm({
    onSuccess: () => {
      console.log('password change success');
    },
    onFail: (error: unknown) => {
      // TODO: 회원가입 실패 알림 모달 출력
      console.error(error);
    },
  });

  return (
    <SettingsInputContainer onSubmit={handlePasswordFormSubmit}>
      <BasicInput
        type="password"
        label="password"
        placeholder="비밀번호를 입력해주세요"
        value={passwordFormValues.password}
        onChange={handlePasswordFormChange}
        errorMessage={passwordFormErrors.password}
        isRequired
      />
      <BasicInput
        type="password"
        label="passwordConfirm"
        placeholder="비밀번호 확인을 입력해주세요"
        value={passwordFormValues.passwordConfirm}
        onChange={handlePasswordFormChange}
        errorMessage={passwordFormErrors.passwordConfirm}
        isRequired
      />
    </SettingsInputContainer>
  );
}
