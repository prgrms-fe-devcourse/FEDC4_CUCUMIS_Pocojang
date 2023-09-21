import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notification } from '@/stores/notification/slice';
import { notificationSelector, setNotification } from '@/stores/notification';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { getNotifications, readNotifications } from '@/api/notifications';
import CHANNEL_ID from '@/consts/channels';

//TODO  api 호출에 대한 에러 처리,형식에 맞지않은 필터 처리 , 타입별 이동 처리, 타입정리

const useNotification = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate('/login');
    (async () => {
      setIsLoading(true);
      await getNotifications().then((data) => dispatch(setNotification(data)));
      setIsLoading(false);
    })();
  }, [dispatch, isLogin, navigate]);

  const notifications: Notification[] = useAppSelector(notificationSelector);
  const parsed = parseNotifications(filterNotifications(notifications));
  return { notifications: parsed, isLoading, readNotifications };
};

export default useNotification;

const filterNotifications = (list: Notification[]) => {
  return list.filter((item) => {
    if (
      item.type === 'like' &&
      (!item.notification.like || !item.notification.like.post)
    )
      return false;
    else if (
      item.type === 'comment' &&
      (!item.notification.comment || !item.notification.comment.post)
    )
      return false;

    return true;
  });
};

const parseNotifications = (list: Notification[]) => {
  return list.map((item) => {
    const { _id, name, seen, notification, type } = item;
    const message = createNotificationMessage(type, name, notification);
    const toURL = createURL(type, notification);
    return { _id, seen, message, toURL };
  });
};

const createURL = (type: string, notification: Notification) => {
  if (type === 'follow') return `/profile/${notification.follow?.follower}`;
  else if (type === 'comment') {
    const channelId = notification.comment?.post.channel;
    const id = notification.comment?.post._id;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `/developers/${id}`
      : `/projects/${id}`;
  } else if (type === 'like') {
    const channelId = notification.like?.post.channel;
    const id = notification.like?.post._id;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `/developers/${id}`
      : `/projects/${id}`;
  }
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
