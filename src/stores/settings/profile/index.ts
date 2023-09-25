import { settingsProfileSlice } from '@/stores/settings/profile/slice';
import * as selector from '@/stores/settings/profile/selector';

export const settingsProfileReducer = settingsProfileSlice.reducer;
export const { setProfileFormValues } = settingsProfileSlice.actions;
export const { settingsProfileSelector, settingsProfileFormValuesSelector } =
  selector;
