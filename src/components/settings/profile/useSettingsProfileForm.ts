import { useEffect, useState } from 'react';

import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  setProfileFormValues,
  settingsProfileFormValuesSelector,
} from '@/stores/settings/profile';
import { updateUser } from '@/api/settings';
import { createPost, getPost, updatePost } from '@/api/posts';
import CHANNEL_ID from '@/consts/channels';
import { userProfilePostIdSelector } from '@/stores/auth/selector';
import { setUser, userFullNameSelector } from '@/stores/auth';
import { PostType, UserType } from '@/types';
import validation from '@/utils/validations';

const validateProfileForm = ({ name, oneLiner, details }: FormValues) => {
  const newErrors: FormErrors = {};

  const nameErrorMessage = validation.name(name);

  if (nameErrorMessage) newErrors.name = nameErrorMessage;
  if (oneLiner.length > 30) newErrors.oneLiner = '30자 미만 입력 가능합니다.';
  if (details.length > 1000) newErrors.details = '1000자 미만 입력 가능합니다.';

  return newErrors;
};

interface SettingsProfileFormParameters {
  onSuccess: () => void;
  onFail: (error: unknown) => void;
}

const updateProfile = (
  profilePostId: string,
  name: string,
  formData: FormData,
): Promise<[PostType, UserType]> =>
  Promise.all([
    updatePost(formData),
    updateUser({ fullName: name, username: profilePostId }),
  ]);

const createProfile = async (
  name: string,
  formData: FormData,
): Promise<UserType> => {
  const profilePost = await createPost(formData);
  const userData = await updateUser({
    fullName: name,
    username: profilePost._id,
  });
  return userData;
};

const useSettingsProfileForm = ({
  onSuccess,
  onFail,
}: SettingsProfileFormParameters) => {
  const dispatch = useAppDispatch();
  const profileName = useAppSelector(userFullNameSelector);
  const profilePostId = useAppSelector(userProfilePostIdSelector);
  const settingsProfileFormValues = useAppSelector(
    settingsProfileFormValuesSelector,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    name: '',
    oneLiner: '',
    techStack: '',
    position: '',
    details: '',
  });

  const onSubmitProfileForm = async () => {
    const formData = new FormData();
    const { name, oneLiner, techStack, position, details } =
      settingsProfileFormValues;

    const title = JSON.stringify({ oneLiner, techStack, position, details });
    formData.append('title', title);
    formData.append('channelId', CHANNEL_ID.DEVELOPER);

    try {
      if (profilePostId) {
        formData.append('postId', title);
        await updateProfile(profilePostId, name, formData);
      } else {
        const userData = await createProfile(name, formData);
        dispatch(setUser(userData));
      }
      onSuccess();
    } catch (error) {
      onFail(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: settingsProfileFormValues,
    onSubmit: onSubmitProfileForm,
    validate: validateProfileForm,
  });

  useEffect(() => {
    if (!profileName || !profilePostId) return;

    const fetchProfilePost = async () => {
      try {
        setIsLoading(true);
        const response = await getPost(profilePostId);
        const { title } = response;
        const profilePost = JSON.parse(title);

        const profileFormValues = {
          name: profileName,
          ...profilePost,
        };

        setDefaultValues(profileFormValues);
        dispatch(setProfileFormValues(profileFormValues));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePost();
  }, [profileName, profilePostId, dispatch]);

  useEffect(() => {
    dispatch(setProfileFormValues(values));
  }, [dispatch, values]);

  return {
    isLoading,
    profileFormDefaultValues: defaultValues,
    profileFormErrors: errors,
    handleProfileFormChange: handleChange,
    handleProfileFormSubmit: handleSubmit,
  };
};

export default useSettingsProfileForm;
