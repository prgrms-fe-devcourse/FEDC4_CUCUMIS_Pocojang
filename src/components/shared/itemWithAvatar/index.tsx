import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
} from '@mui/material';

import BasicChip from '@/components/shared/chip';
import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatarProps from '@/types/components/ItemWithAvatarProps';

const ItemWithAvatar = ({
  AvatarProps,
  name,
  message,
  unReadCount,
  to,
  isLastItem = false,
  isComment = false,
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
      <ListItem alignItems="center">
        <BasicAvatar size={40} alt={`${name}'s profile`} {...AvatarProps} />
        <ListItemButton component={Link} to={to ? to : ''}>
          <ListItemText
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
        </ListItemButton>

        {renderUnReadCount()}
      </ListItem>
      {!isLastItem && <Divider variant="middle" />}
    </>
  );
};

export default ItemWithAvatar;
