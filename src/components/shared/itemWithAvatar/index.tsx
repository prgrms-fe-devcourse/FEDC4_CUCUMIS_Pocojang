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
import { ItemWithAvatarProps } from '@/types/components/ItemWithAvatarProps';

const ItemWithAvatar = ({
  name,
  imgSrc,
  message,
  unReadCount,
  moveTo,
  isUserOn,
  isLastItem = false,
  isComment = false,
  onClick,
}: ItemWithAvatarProps) => {
  const renderUnReadCount = () => {
    if (unReadCount) {
      return (
        <Box maxWidth={60}>
          <BasicChip
            label={unReadCount > 1000 ? '999+' : String(unReadCount)}
          />
        </Box>
      );
    }
    return null;
  };
  return (
    <>
      <ListItem alignItems="center" component={Link} to={moveTo ?? ''}>
        <BasicAvatar
          size={40}
          imgSrc={imgSrc}
          alt={`${name}'s profile`}
          isUserOn={isUserOn}
          onClick={onClick}
        />
        <ListItemTextStyled
          primary={<Typography color="text.primary">{name}</Typography>}
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
        {renderUnReadCount()}
      </ListItem>
      {!isLastItem && <Divider variant="middle" />}
    </>
  );
};

const ListItemTextStyled = styled(ListItemText)({
  paddingLeft: '10px',
  paddingRight: '5px',
});

export default ItemWithAvatar;
