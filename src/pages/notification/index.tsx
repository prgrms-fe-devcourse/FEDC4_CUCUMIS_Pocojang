import { Stack } from '@mui/material';

import NotificationItem from '@/components/notification/NotificationItem';
import useNotifications from '@/components/notification/useNotification';

const NotificationPage = () => {
  //TODO 클릭시 읽음 처리
  const { notificationMessage, notifications } = useNotifications();
  return (
    <Stack spacing={2}>
      {notifications.map(({ _id, type, seen, name }) => (
        <NotificationItem
          onClick={() => {
            console.log('읽음 처리');
          }}
          key={_id}
          seen={seen}
        >
          {name + notificationMessage[type]}
        </NotificationItem>
      ))}
    </Stack>
  );
};

export default NotificationPage;
