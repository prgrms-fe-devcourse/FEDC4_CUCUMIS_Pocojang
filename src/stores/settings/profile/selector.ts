import { FormValues } from '@/hooks/useForm';
import { RootState } from '@/stores';
import { SettingsProfileState } from '@/stores/settings/profile/slice';

export const settingsProfileSelector = (
  state: RootState,
): SettingsProfileState => state.settingsProfile;

export const settingsProfileFormValuesSelector = (
  state: RootState,
): FormValues => state.settingsProfile.profileFormValues;
