import { Stack } from '@mui/material';

import NotificationItem from '@/components/notification/NotificationItem';
import useNotification from '@/components/notification/useNotification';

const NotificationPage = () => {
  const { notificationMessage, notifications, handleClickItem } =
    useNotification();

  return (
    <Stack spacing={2}>
      {notifications.map(({ _id, type, isSeen, name }) => (
        <NotificationItem
          onClick={() => {
            handleClickItem(_id);
          }}
          key={_id}
          isSeen={isSeen}
        >
          {name + notificationMessage[type]}
        </NotificationItem>
      ))}
    </Stack>
  );
};

export default NotificationPage;
