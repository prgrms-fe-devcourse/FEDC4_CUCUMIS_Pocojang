import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserType } from '@/types';
import { getUser, uploadUserPhoto } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  changeNavigationTab,
  navigationTabSelector,
  buttonStateSelector,
  toggleButton,
  myAccountSelector,
  updateMyAccount,
  userSelector,
  updateUserAccount,
  loadingSelector,
  toggleLoading,
  selectedFileSelector,
  updateImage,
  updateFileName,
} from '@/stores/profile';
import { fileNameSelector } from '@/stores/profile/selector';

export default function useProfile() {
  const dispatch = useAppDispatch();
  const currentNavTab = useAppSelector(navigationTabSelector);
  const buttonState = useAppSelector(buttonStateSelector);
  const myAccount = useAppSelector(myAccountSelector);
  const userState = useAppSelector(userSelector);
  const loading = useAppSelector(loadingSelector);
  const selectedFile = useAppSelector(selectedFileSelector);
  const fileName = useAppSelector(fileNameSelector);

  const { userId } = useParams();
  const navigate = useNavigate();
  const navigationData = [
    { label: userState?.following.length || 0, title: '팔로잉' },
    { label: userState?.followers.length || 0, title: '팔로워' },
    { label: userState?.posts.length || 0, title: '포스트' },
    { label: userState?.likes.length || 0, title: '스크랩' },
  ];

  const isMe = (userId: string) => myAccount?._id === userId;

  const checkFollowingStatus = async (buttonState: boolean, userId: string) => {
    try {
      dispatch(toggleLoading(true));
      if (!buttonState) {
        await followUser({ userId });
      } else {
        const findMe = await getUser(myAccount?._id as string);
        const followingObj = findMe?.following.find((e) => e.user === userId);
        await unFollowUser({ id: followingObj?._id as string });
      }
      const updatedAccount = await getUser(myAccount?._id as string);
      dispatch(updateMyAccount(updatedAccount));
      dispatch(toggleButton(!buttonState));
    } catch (error) {
      console.error('팔로우 토글 에러 >> ', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const isInMyFollowingList = useCallback(
    async (userId: string) => {
      try {
        const isFollowing = myAccount?.following.some((e) => e.user === userId);
        dispatch(toggleButton(isFollowing));
        return isFollowing;
      } catch (error) {
        console.error('팔로잉 리스트 체크 에러 >> ', error);
        return false;
      }
    },
    [myAccount, dispatch],
  );

  const navigationMoving = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    dispatch(changeNavigationTab(newValue));
  };

  const changeProfile = (user: UserType, value: boolean) => {
    try {
      const newObj = { ...userState };
      if (value) {
        newObj.coverImage = user.coverImage as string;
      } else {
        newObj.image = user.image as string;
      }
      dispatch(updateMyAccount(newObj as UserType));
    } catch (error) {
      console.error('프로필 변경 에러 >> ', error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(toggleLoading(true));
    try {
      const file = event.target.files?.[0];
      if (file) {
        dispatch(updateFileName(file.name));
        dispatch(updateImage(file));
        await handleFileUpload(file, event.target.id);
      } else {
        dispatch(updateFileName('파일을 선택하세요.'));
      }
    } catch (error) {
      console.error('프로필 업로드 에러 >> ', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const handleFileUpload = async (file: File, id: string) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('isCover', String(id === 'profile-photo' ? false : true));

      const upload = await uploadUserPhoto(formData);
      changeProfile(upload, id === 'profile-photo' ? false : true);
      console.log(selectedFile, fileName);
    } catch (error) {
      console.error('프로필 업로드 에러 >> ', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(toggleLoading(true));
        const user = await getUser(userId as string);
        dispatch(updateUserAccount(user));
        await isInMyFollowingList(userId as string);
      } catch (error) {
        console.error('데이터 fetch 에러 >> ', error);
      } finally {
        dispatch(toggleLoading(false));
      }
    }
    fetchData();
  }, [userId, isInMyFollowingList, dispatch]);

  useEffect(() => {
    const resetMyAccount = async () => {
      dispatch(toggleLoading(true));
      try {
        if (myAccount?._id) {
          const newAccount = await getUser(myAccount._id);
          dispatch(updateMyAccount(newAccount));
        }
      } catch (error) {
        console.error('내 계정 업데이트 에러 >>', error);
      } finally {
        dispatch(toggleLoading(false));
      }
    };
    resetMyAccount();
  }, [myAccount?._id, dispatch]);

  return {
    navigate,
    loading,
    navigationData,
    currentNavTab,
    navigationMoving,
    userId,
    userState,
    buttonState,
    isMe,
    checkFollowingStatus,
    isInMyFollowingList,
    handleFileChange,
  };
}
