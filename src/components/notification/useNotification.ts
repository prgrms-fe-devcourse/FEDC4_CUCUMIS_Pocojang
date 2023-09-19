import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationsStateType } from '@/stores/notification/slice';
import {
  notificationSelector,
  setNotification,
  handleClick,
} from '@/stores/notification';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { getNotifications, readNotifications } from '@/api/notifications';

//TODO 호출 타입 정리, api 호출에 대한 에러 처리, 타입 위치 및 이름
const useNotification = () => {
  const notificationMessage: { [key: string]: string } = {
    comment: '님이 댓글을 추가했습니다.',
    like: '님이 좋아요',
    follow: '님이 팔로우',
    message: '님이 메세지',
  };

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    } else {
      return () => {
        readNotifications();
      };
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (isLogin)
      getNotifications().then((data) => dispatch(setNotification(data)));
  }, [dispatch, isLogin]);

  const handleClickItem = (_id: string) => {
    dispatch(handleClick(_id));
  };

  const notifications: NotificationsStateType[] =
    useAppSelector(notificationSelector);

  return { notificationMessage, notifications, handleClickItem };
};

export default useNotification;
