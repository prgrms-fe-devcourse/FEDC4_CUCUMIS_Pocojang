import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notification } from '@/stores/notification/slice';
import { notificationSelector, setNotification } from '@/stores/notification';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { getNotifications } from '@/api/notifications';
import CHANNEL_ID from '@/consts/channels';

//TODO  api 호출에 대한 에러 처리, typ별 메시지 변경, 타입별 이동 처리

const useNotification = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (isLogin)
      getNotifications().then((data) => dispatch(setNotification(data)));
  }, [dispatch, isLogin]);

  const notifications: Notification[] = useAppSelector(notificationSelector);
  const parsed = parseNotifications(notifications);
  return { notifications: parsed };
};

export default useNotification;
const parseNotifications = (list: Notification[]) => {
  return list.map((item) => {
    const { _id, name, seen, notification, type } = item;
    const message = createNotificationMessage(type, name, notification);

    return { _id, seen, message };
  });
};

const createNotificationMessage = (
  type: string,
  name: string,
  notification: Notification,
) => {
  const { comment, like } = notification;
  if (type === 'follow') return `${name}님이 나를 팔로우 했습니다.`;
  else if (type === 'comment') {
    if (!comment || !comment.post) return `${name}님이 댓글을 남겼습니다`;
    const channelId = comment.post.channel;
    const title = JSON.parse(comment.post.title).title;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `${name}님이 프로필에 댓글을 남겼습니다`
      : `${name}님이 '${title}'에 댓글을 남겼습니다.`;
  } else if (type === 'like') {
    if (!like || !like.post) return `${name}님이 좋아합니다`;
    const channelId = like.post.channel;
    const title = JSON.parse(like.post.title).title;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `${name}님이 프로필을 좋아합니다.`
      : `${name}님이 '${title}'을 좋아합니다.`;
  } else {
    return `${name}님이 메세지를 보냈습니다`;
  }
};
