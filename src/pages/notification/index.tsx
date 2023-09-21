import { Stack } from '@mui/material';

import NotificationItem from '@/components/notification/NotificationItem';
import useNotification from '@/components/notification/useNotification';

const NotificationPage = () => {
  const { notifications } = useNotification();

  return (
    <Stack spacing={2}>
      {notifications.map((notification) => (
        <NotificationItem
          onClick={() => {}}
          key={notification._id}
          isSeen={notification.seen}
        >
          {notification.message}
        </NotificationItem>
      ))}
    </Stack>
  );
};

export default NotificationPage;
