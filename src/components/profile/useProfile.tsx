import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';
import { UserType } from '@/types';
import { getUserId } from '@/api/users/userId';
import { followUser } from '@/api/follow/create';
import { unFollowUser } from '@/api/follow/delete';
import { uploadPhoto } from '@/api/users/uploadPhoto';

export default function useProfile() {
  const [buttonState, setButtonState] = useState<boolean>(); // true이면 팔로잉, false이면 팔로잉 취소(이미 돼 있음)
  const [userState, setUserState] = useState<UserType>();
  const navigationData = [
    { label: userState?.following.length || 0, title: '팔로잉' },
    { label: userState?.followers.length || 0, title: '팔로워' },
    { label: userState?.posts.length || 0, title: '포스트' },
    { label: userState?.likes.length || 0, title: '스크랩' },
  ];
  const [value, setValue] = useState<number | string>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileName, setFileName] = useState<string>('파일을 선택하세요.');
  const { userId } = useParams();
  const navigate = useNavigate();

  const getMyInfo = () => {
    return session.getItem<UserType>(SESSION_STORAGE.USER);
  };
  const getUserInfo = async (userId: string) => {
    const userInfo = await getUserId(userId);
    return userInfo;
  };
  const isMe = (userId: string) => {
    return getMyInfo()?._id === userId;
  };

  const followingOrUnFollowing = async (
    buttonState: boolean,
    userId: string,
  ) => {
    if (!buttonState) {
      await followUser({ userId });
      setButtonState((prev) => !prev);
    } else if (buttonState) {
      const me = await getUserInfo(getMyInfo()?._id as string);
      const followingObj = me.following.find((e) => e.user === userId);
      await unFollowUser({ id: followingObj?._id as string });
      setButtonState((prev) => !prev);
    }
  };

  const isInMyFollowingList = useCallback(async (userId: string) => {
    const data = await getUserInfo(getMyInfo()?._id as string);
    const result = data.following.find((e) => e.user === userId);
    result ? setButtonState(true) : setButtonState(false);
    return result;
  }, []);

  const goNextPage = (url: string) => {
    navigate(url);
  };

  const navigationMoving = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    setValue(newValue);
  };
  const changeProfile = (user: UserType, value: boolean) => {
    const newObj = { ...userState };
    if (value) {
      newObj.coverImage = user.coverImage as string;
      setUserState(newObj as UserType);
    } else {
      newObj.image = user.image as string;
      setUserState(newObj as UserType);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(fileName);
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      handleFileUpload(file, event.target.id);
    } else {
      setFileName('파일을 선택하세요.');
    }
  };

  const handleFileUpload = async (file: File, id: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('isCover', String(id === 'profile-photo' ? false : true));

    const upload = await uploadPhoto(formData);
    console.log(selectedFile);
    changeProfile(upload, id === 'profile-photo' ? false : true);
  };

  useEffect(() => {
    const request = async () => {
      const user = await getUserInfo(userId as string);
      setUserState(user);
      isInMyFollowingList(userId as string);
    };
    request();
  }, [userId, isInMyFollowingList]);

  return {
    navigationData,
    value,
    navigationMoving,
    userId,
    userState,
    buttonState,
    getMyInfo,
    getUserInfo,
    isMe,
    followingOrUnFollowing,
    isInMyFollowingList,
    goNextPage,
    handleFileChange,
  };
}
