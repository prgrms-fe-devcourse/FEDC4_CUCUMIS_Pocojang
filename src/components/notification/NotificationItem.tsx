import { Typography, Card, CardContent, Stack } from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { Circle } from '@mui/icons-material';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

interface Props extends CardProps {
  seen: boolean;
  children: React.ReactNode;
}

const NotificationItem = ({ seen, children, ...props }: Props) => {
  return (
    <CardStyled seen={seen} raised={false} square={true} {...props}>
      <CardContent component={Stack} direction="row" alignItems="center">
        <Typography noWrap={true} flexGrow={1} variant="body1">
          {children}
        </Typography>
        {seen ? '' : <Circle color="primary" />}
      </CardContent>
    </CardStyled>
  );
};

const CardStyled = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'seen',
})(({ seen }: { seen: boolean }) => ({
  backgroundColor: seen ? '' : `${theme.palette.primary.main}10`,
  boxShadow: 'none',
  '.MuiCardContent-root': {
    paddingTop: '24px',
  },
}));
export default NotificationItem;
