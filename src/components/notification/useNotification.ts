import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { notificationCreateType } from '@/consts/notificationCreateType';
import { Notification } from '@/stores/notification/slice';
import {
  notificationSelector,
  setNotification,
  readAllNotification,
} from '@/stores/notification';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { getNotifications, readNotifications } from '@/api/notifications';
import CHANNEL_ID from '@/consts/channels';
import {
  DEVELOPER_URL,
  PROJECT_URL,
  PROFILE_URL,
  LOGIN_URL,
} from '@/consts/routes';

interface useNotificationParameter {
  onGetFail: (error: unknown) => void;
}

const useNotification = ({ onGetFail }: useNotificationParameter) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  const navigate = useNavigate();
  const notifications: Notification[] = useAppSelector(notificationSelector);
  const parsed = parseNotifications(filterNotifications(notifications));

  const handleReadAllButton = () => {
    dispatch(readAllNotification());
    try {
      readNotifications();
    } catch (error) {
      onGetFail(error);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate(LOGIN_URL);
    (async () => {
      setIsLoading(true);
      try {
        await getNotifications().then((data) =>
          dispatch(setNotification(data)),
        );
      } catch (error) {
        onGetFail(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, isLogin, navigate, onGetFail]);

  return { notifications: parsed, isLoading, handleReadAllButton };
};

export default useNotification;

const filterNotifications = (list: Notification[]) => {
  return list.filter((item) => {
    if (
      item.type === notificationCreateType.like &&
      (!item.notification.like || !item.notification.like.post)
    )
      return false;
    else if (
      item.type === notificationCreateType.comment &&
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
  if (type === notificationCreateType.follow)
    return `${PROFILE_URL}${notification.follow?.follower}`;
  else if (type === notificationCreateType.comment) {
    const channelId = notification.comment?.post.channel;
    const id = notification.comment?.post._id;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `${DEVELOPER_URL}/${id}`
      : `${PROJECT_URL}/${id}`;
  } else if (type === notificationCreateType.like) {
    const channelId = notification.like?.post.channel;
    const id = notification.like?.post._id;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `${DEVELOPER_URL}/${id}`
      : `${PROJECT_URL}/${id}`;
  }
};

const createNotificationMessage = (
  type: string,
  name: string,
  notification: Notification,
) => {
  const { comment, like } = notification;
  if (type === notificationCreateType.follow)
    return `${name}님이 나를 팔로우 했습니다.`;
  else if (type === notificationCreateType.comment) {
    if (!comment || !comment.post) return `${name}님이 댓글을 남겼습니다`;
    const channelId = comment.post.channel;
    const title = JSON.parse(comment.post.title).title;
    return channelId === CHANNEL_ID.DEVELOPER
      ? `${name}님이 프로필에 댓글을 남겼습니다`
      : `${name}님이 '${title}'에 댓글을 남겼습니다.`;
  } else if (type === notificationCreateType.like) {
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
