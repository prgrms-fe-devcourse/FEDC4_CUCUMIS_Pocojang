import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Skeleton,
} from '@mui/material';
import styled from '@emotion/styled';

import BasicChip from '@/components/shared/chip';
import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatarProps from '@/types/components/ItemWithAvatarProps';

const ItemWithAvatar = ({
  children,
  AvatarProps,
  name,
  message,
  unReadCount,
  to,
  isLastItem = false,
  isComment = false,
  ...props
}: ItemWithAvatarProps) => {
  const renderUnReadCount = () => {
    if (unReadCount) {
      if (unReadCount > 0) {
        return (
          <Box maxWidth={60}>
            <BasicChip
              label={unReadCount > 999 ? '999+' : String(unReadCount)}
            />
          </Box>
        );
      } else return <SkeletonStyled variant="rounded" width={32} height={32} />;
    }
  };

  const renderListItemText = () => (
    <ListItemText
      primary={<Typography color="text.primary">{name}</Typography>}
      secondary={
        message && (
          <Typography variant="body2" color="text.primary" noWrap={!isComment}>
            {message}
          </Typography>
        )
      }
    />
  );

  return (
    <>
      <ListItem alignItems="center" {...props}>
        <BasicAvatar size={40} alt={`${name}'s profile`} {...AvatarProps} />
        {to ? (
          <ListItemButton component={Link} to={to ? to : ''}>
            {renderListItemText()}
          </ListItemButton>
        ) : (
          <BoxStyled>{renderListItemText()}</BoxStyled>
        )}
        {children}
        {renderUnReadCount()}
      </ListItem>
      {!isLastItem && <Divider variant="middle" />}
    </>
  );
};

const BoxStyled = styled(Container)({
  padding: '8px 16px',
});

const SkeletonStyled = styled(Skeleton)({
  minWidth: '30px',
  borderRadius: '16px',
});

export default ItemWithAvatar;
