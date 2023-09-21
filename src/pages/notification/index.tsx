import { Stack, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import NotificationItem from '@/components/notification/NotificationItem';
import useNotification from '@/components/notification/useNotification';
const NotificationPage = () => {
  const { notifications, isLoading } = useNotification({ onGetFail: () => {} });
  const navigate = useNavigate();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={2}>
      {notifications.map((notification) => (
        <NotificationItem
          onClick={() => {
            navigate(`${notification.toURL}`);
          }}
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
