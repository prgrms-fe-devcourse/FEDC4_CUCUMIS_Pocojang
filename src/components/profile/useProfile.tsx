import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';
import { UserType } from '@/types';
import { getUser, uploadUserPhoto } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';

export default function useProfile() {
  const [buttonState, setButtonState] = useState<boolean>();
  const [followingList, setFollowingList] = useState<UserType[]>();
  const [followerList, setFollowerList] = useState<UserType[]>();
  const [userState, setUserState] = useState<UserType | null>(null);

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true); // 유저 데이터 로딩 상태
  const [isLoadingFollowing, setIsLoadingFollowing] = useState<boolean>(true); // following 데이터 로딩 상태
  const [isLoadingFollowers, setIsLoadingFollowers] = useState<boolean>(true); // followers 데이터 로딩 상태
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
    const userInfo = await getUser(userId);
    return userInfo;
  };
  const isMe = (userId: string) => {
    return getMyInfo()?._id === userId;
  };

  const checkFollowingStatus = async (buttonState: boolean, userId: string) => {
    if (!buttonState) {
      await followUser({ userId });
      setButtonState((prev) => !prev);
    } else if (buttonState) {
      const me = await getUser(getMyInfo()?._id as string);
      const followingObj = me.following.find((e) => e.user === userId);
      await unFollowUser({ id: followingObj?._id as string });
      setButtonState((prev) => !prev);
    }
  };

  const isInMyFollowingList = useCallback(async (userId: string) => {
    const data = await getUser(getMyInfo()?._id as string);
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

    const upload = await uploadUserPhoto(formData);
    console.log(selectedFile);
    changeProfile(upload, id === 'profile-photo' ? false : true);
  };

  useEffect(() => {
    const request = async () => {
      setIsLoadingUser(true);
      try {
        const user = await getUserInfo(userId as string);
        setUserState(user);
        isInMyFollowingList(userId as string);
      } catch (e) {
        console.error('error >> ', e);
      } finally {
        // setIsLoadingUser(false); // 바로 x
      }
    };

    request();
  }, [userId, isInMyFollowingList]);

  // Following 데이터 가져오기
  useEffect(() => {
    if (userState) {
      const { following } = userState;
      const fetchData = async () => {
        setIsLoadingFollowing(true);

        try {
          const followingData = await Promise.all(
            following.map(({ user }) => getUser(user)),
          );
          setFollowingList(followingData);
        } catch (error) {
          console.error('Following 데이터 가져오기 오류:', error);
        } finally {
          setIsLoadingFollowing(false);
        }
      };

      fetchData();
    }
  }, [userState]);

  // Followers 데이터 가져오기
  useEffect(() => {
    if (userState) {
      const { followers } = userState;
      const fetchData = async () => {
        setIsLoadingFollowers(true);

        try {
          const followersData = await Promise.all(
            followers.map(({ follower }) => getUser(follower)),
          );
          setFollowerList(followersData);
        } catch (error) {
          console.error('Followers 데이터 가져오기 오류:', error);
        } finally {
          setIsLoadingFollowers(false);
        }
      };

      fetchData();
    }
  }, [userState]);
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
    checkFollowingStatus,
    isInMyFollowingList,
    goNextPage,
    handleFileChange,
    followerList,
    followingList,
    isLoadingUser,
    isLoadingFollowers,
    isLoadingFollowing,
  };
}
