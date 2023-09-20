import { Typography, Card, CardContent, Stack } from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { Circle } from '@mui/icons-material';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

interface Props extends CardProps {
  isSeen: boolean;
  children: React.ReactNode;
}

const NotificationItem = ({ isSeen, children, ...props }: Props) => {
  return (
    <CardStyled isSeen={isSeen} raised={false} square={true} {...props}>
      <CardContent component={Stack} direction="row" alignItems="center">
        <Typography noWrap={true} flexGrow={1} variant="body1">
          {children}
        </Typography>
        {isSeen ? '' : <Circle color="primary" />}
      </CardContent>
    </CardStyled>
  );
};

const CardStyled = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSeen',
})(({ isSeen }: { isSeen: boolean }) => ({
  backgroundColor: isSeen ? '' : `${theme.palette.primary.main}10`,
  boxShadow: 'none',
  '.MuiCardContent-root': {
    paddingTop: '24px',
  },
}));
export default NotificationItem;
