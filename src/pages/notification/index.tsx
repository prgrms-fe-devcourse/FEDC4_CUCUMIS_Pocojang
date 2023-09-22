import { Stack, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import BasicButton from '@/components/shared/button';
import NotificationItem from '@/components/notification/NotificationItem';
import useNotification from '@/components/notification/useNotification';

const NotificationPage = () => {
  const { notifications, isLoading, handleReadAllButton } = useNotification({
    onGetFail: useCallback((error: unknown) => {
      console.log(error);
    }, []),
  });
  const navigate = useNavigate();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={2} overflow="scroll">
      <BasicButton onClick={handleReadAllButton}>모두 읽음 처리</BasicButton>
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
