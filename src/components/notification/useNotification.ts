import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notification } from '@/stores/notification/slice';
import {
  notificationSelector,
  setNotification,
  handleClick,
} from '@/stores/notification';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { getNotifications, readNotifications } from '@/api/notifications';

//TODO  api 호출에 대한 에러 처리, 타입 위치 및 이름, user정보에 가져오고 인터벌 처리?
const useNotification = () => {
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

  const readNotification = (_id: string) => {
    dispatch(handleClick(_id));
  };

  const notifications: Notification[] = useAppSelector(notificationSelector);

  return { notificationMessage, notifications, readNotification };
};

export default useNotification;
const notificationMessage: { [key: string]: string } = {
  comment: '님이 댓글을 추가했습니다.',
  like: '님이 좋아요를 눌렀습니다.',
  follow: '님이 팔로우했습니다.',
  message: '님이 메세지를 보냈습니다.',
};
