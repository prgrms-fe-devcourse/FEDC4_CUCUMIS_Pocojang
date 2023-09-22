import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';
import { UserType } from '@/types';
import { getUser, uploadUserPhoto } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';

export default function useProfile() {
  const [myAccount, setMyAccount] = useState(
    session.getItem<UserType>(SESSION_STORAGE.USER),
  );
  const [buttonState, setButtonState] = useState<boolean>();
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

  const isMe = (userId: string) => {
    return myAccount?._id === userId;
  };

  const checkFollowingStatus = async (buttonState: boolean, userId: string) => {
    if (!buttonState) {
      await followUser({ userId }).then(async () => {
        const updateMyAccount = await getUser(myAccount?._id as string);
        setMyAccount(updateMyAccount);
      });
      const updateMyAccount = await getUser(myAccount?._id as string);
      setMyAccount(updateMyAccount);
      setButtonState((prev) => !prev);
    } else if (buttonState) {
      const findMe = await getUser(myAccount?._id as string);
      const followingObj = findMe?.following.find((e) => e.user === userId);
      await unFollowUser({ id: followingObj?._id as string }).then(async () => {
        const updateMyAccount = await getUser(myAccount?._id as string);
        setMyAccount(updateMyAccount);
      });
      setButtonState((prev) => !prev);
    }
  };

  const isInMyFollowingList = useCallback(
    async (userId: string) => {
      const result = myAccount?.following.find((e) => e.user === userId);
      result ? setButtonState(true) : setButtonState(false);
      return result;
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
    const newObj = { ...userState };
    if (value) {
      newObj.coverImage = user.coverImage as string;
      setMyAccount(newObj as UserType);
    } else {
      newObj.image = user.image as string;
      setMyAccount(newObj as UserType);
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

    const upload = await uploadUserPhoto(formData);
    console.log(selectedFile);
    changeProfile(upload, id === 'profile-photo' ? false : true);
  };

  useEffect(() => {
    const request = async () => {
      const user = await getUser(userId as string);
      setUserState(user);
      isInMyFollowingList(userId as string);
    };
    request();
  }, [userId, isInMyFollowingList, myAccount]);

  useEffect(() => {
    const resetMyAccount = async () => {
      const newAccount = await getUser(myAccount?._id as string);
      setMyAccount(newAccount);
    };
    resetMyAccount();
  }, [myAccount?._id]);

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
