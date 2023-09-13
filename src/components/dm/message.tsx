import styled from '@emotion/styled';
import Box from '@mui/material/Box';

import { theme } from '@/styles/theme';

interface Props {
  message: string;
  isSender: boolean;
}

const Message = ({ message, isSender }: Props) => {
  return (
    <MessageLayout sender={isSender}>
      {isSender ? <RightBox>{message}</RightBox> : <LeftBox>{message}</LeftBox>}
    </MessageLayout>
  );
};

const MessageLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sender',
})(({ sender }: { sender: boolean }) => ({
  textAlign: `${sender ? 'right' : 'left'}`,
}));

const BoxStyled = styled(Box)({
  marginBottom: '20px',
  padding: '8px 12px',
  position: 'relative',
  display: 'inline-block',
  borderRadius: '4px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    border: '20px solid transparent',
    borderBottom: 0,
    marginBottom: '-8px',
  },
});

const RightBox = styled(BoxStyled)({
  backgroundColor: `${theme.palette.primary.main}`,
  color: 'white',
  '&:after': {
    right: 0,
    borderRight: 0,
    borderTopColor: `${theme.palette.primary.main}`,
  },
});

const LeftBox = styled(BoxStyled)({
  backgroundColor: '#F7F7F7',
  color: 'black',
  '&:after': {
    left: 0,
    borderLeft: 0,
    borderTopColor: '#F7F7F7',
  },
});

export default Message;
