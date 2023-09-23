import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';
import { UserType } from '@/types';
import { getUser, uploadUserPhoto } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';

export default function useProfile() {
  const [myAccount, setMyAccount] = useState<UserType | null>(
    session.getItem(SESSION_STORAGE.USER),
  );
  const [userState, setUserState] = useState<UserType>();
  const [buttonState, setButtonState] = useState<boolean>();
  const [value, setValue] = useState<number | string>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileName, setFileName] = useState<string>('파일을 선택하세요.');

  const { userId } = useParams();
  const navigate = useNavigate();
  const navigationData = [
    { label: userState?.following.length || 0, title: '팔로잉' },
    { label: userState?.followers.length || 0, title: '팔로워' },
    { label: userState?.posts.length || 0, title: '포스트' },
    { label: userState?.likes.length || 0, title: '스크랩' },
  ];

  const isMe = (userId: string) => {
    return myAccount?._id === userId;
  };

  const checkFollowingStatus = async (buttonState: boolean, userId: string) => {
    try {
      if (!buttonState) {
        await followUser({ userId });
      } else {
        const findMe = await getUser(myAccount?._id as string);
        const followingObj = findMe?.following.find((e) => e.user === userId);
        await unFollowUser({ id: followingObj?._id as string });
      }
      const updatedAccount = await getUser(myAccount?._id as string);
      setMyAccount(updatedAccount);
      setButtonState((prev) => !prev);
    } catch (error) {
      console.error('Follow toggle ERROR >> ', error);
    }
  };

  const isInMyFollowingList = useCallback(
    async (userId: string) => {
      try {
        const isFollowing = myAccount?.following.some((e) => e.user === userId);
        setButtonState(isFollowing);
        return isFollowing;
      } catch (error) {
        console.error('following List check ERRRO >> ', error);
        return false;
      }
    },
    [myAccount],
  );

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
    try {
      const newObj = { ...userState };
      if (value) {
        newObj.coverImage = user.coverImage as string;
        setMyAccount(newObj as UserType);
      } else {
        newObj.image = user.image as string;
        setMyAccount(newObj as UserType);
      }
    } catch (error) {
      console.error('프로필 변경 ERROR >> ', error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        setSelectedFile(file);
        await handleFileUpload(file, event.target.id);
      } else {
        setFileName('파일을 선택하세요.');
      }
    } catch (error) {
      console.error('파일 업로드 ERROR >> ', error);
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
      console.error('파일 업로드 에러:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUser(userId as string);
        setUserState(user);
        await isInMyFollowingList(userId as string);
      } catch (error) {
        console.error('get data ERROR >> ', error);
      }
    }
    fetchData();
  }, [userId, isInMyFollowingList]);

  useEffect(() => {
    const resetMyAccount = async () => {
      try {
        if (myAccount) {
          const newAccount = await getUser(myAccount._id);
          setMyAccount(newAccount);
        }
      } catch (error) {
        console.error('myAccount update ERROR >> ', error);
      }
    };
    resetMyAccount();
  }, [myAccount]);

  return {
    navigationData,
    value,
    navigationMoving,
    userId,
    userState,
    buttonState,
    isMe,
    checkFollowingStatus,
    isInMyFollowingList,
    goNextPage,
    handleFileChange,
  };
}
