import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

import BasicChip from '@/components/shared/chip';
import BasicAvatar from '@/components/shared/avatar';
import BasicAvatarProps from '@/types/components/BasicAvatarProps';

interface ItemWithAvatarProps extends BasicAvatarProps {
  name: string;
  message?: string;
  notReadCount?: number;
  moveTo: string;
  isLastItem?: boolean;
  isComment?: boolean;
}

const ItemWithAvatar = ({
  name,
  imgSrc,
  message,
  notReadCount,
  moveTo,
  isUserOn,
  isLastItem = false,
  isComment = false,
}: ItemWithAvatarProps) => {
  const renderNotReadCount = () => {
    if (notReadCount) {
      return (
        <Box maxWidth={60}>
          <BasicChip
            label={notReadCount > 1000 ? '999+' : String(notReadCount)}
          />
        </Box>
      );
    }
    return null;
  };

  return (
    <LinkStyled to={moveTo}>
      <ListItem alignItems="center">
        <BasicAvatar
          size={40}
          imgSrc={imgSrc}
          alt={`${name}'s profile`}
          isUserOn={isUserOn}
        />
        <ListItemTextStyled
          primary={name}
          secondary={
            message && (
              <Typography
                variant="body2"
                color="text.primary"
                noWrap={!isComment}
              >
                {message}
              </Typography>
            )
          }
        />
        {renderNotReadCount()}
      </ListItem>
      {!isLastItem && <Divider variant="middle" />}
    </LinkStyled>
  );
};

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const ListItemTextStyled = styled(ListItemText)({
  paddingLeft: '10px',
  paddingRight: '5px',
});

export default ItemWithAvatar;
