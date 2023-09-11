import {
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
} from '@mui/material';
import { Circle } from '@mui/icons-material';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

//TODO key는 _id로 변경, 이벤트 바인딩
const NotificationPage = () => {
  return (
    <List>
      {dummyNotifications.map((notification, index) => (
        <>
          <NotificationItem key={index} seen={notification.seen}>
            {notification.name + notificationMessage[notification.type]}
          </NotificationItem>
          {dummyNotifications.length - 1 !== index ? <StyledDivider /> : ''}
        </>
      ))}
    </List>
  );
};

export default NotificationPage;
interface Props {
  seen: boolean;
  children: React.ReactNode;
}
const NotificationItem = ({ seen, children }: Props) => {
  return (
    <StyledCard
      seen={seen}
      raised={false}
      square={true}
      onClick={() => console.log('hi')}
    >
      <CardContent component={Stack} direction="row" alignItems="center">
        <Typography noWrap={true} flexGrow={1} variant="body1">
          {children}
        </Typography>
        {seen ? '' : <Circle color="primary" />}
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'seen',
})(({ seen }: { seen: boolean }) => ({
  backgroundColor: seen ? '' : `${theme.palette.primary.main}10`,
  boxShadow: 'none',
  '.MuiCardContent-root': {
    paddingTop: '24px',
  },
}));

const StyledDivider = styled(Divider)(() => ({
  color: 'transparent',
  margin: '3px auto',
}));
const notificationMessage: { [key: string]: string } = {
  COMMENT: '님이 포스트에 댓글을 작성했습니다',
  MESSAGE: '님이 메세지를 보냈습니다',
  LIKE: '님이 포스트에 좋아요',
  FOLLOW: '님이 팔로우 했습니다',
};

const dummyNotifications = [
  { type: 'COMMENT', seen: true, name: 'user1' },
  { type: 'MESSAGE', seen: true, name: 'user2' },
  { type: 'FOLLOW', seen: false, name: 'user3' },
  { type: 'COMMENT', seen: false, name: 'user4' },
  { type: 'MESSAGE', seen: true, name: 'user5' },
  { type: 'LIKE', seen: true, name: 'user6' },
  { type: 'COMMENT', seen: false, name: 'user7' },
  { type: 'LIKE', seen: true, name: 'user8' },
  { type: 'COMMENT', seen: true, name: 'user9' },
  { type: 'MESSAGE', seen: true, name: 'user10' },
];
