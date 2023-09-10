import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import type BasicAvatarProps from '@/types/components/BasicAvatarProps';
import BasicAvatar from '@/components/shared/avatar';

interface Props {
  name: string;
  comment: string;
  AvatarProps: BasicAvatarProps;
}

const CommentItem = ({ name, comment, AvatarProps }: Props) => {
  return (
    <ListItem alignItems="flex-start">
      <StyledListItemAvatar>
        <BasicAvatar {...AvatarProps} />
      </StyledListItemAvatar>

      <ListItemText
        primary={<Typography variant="body2">{name}</Typography>}
        secondary={
          <Typography
            paragraph
            variant="body1"
            display="block"
            textOverflow="ellipsis"
            component="p"
          >
            {comment}
          </Typography>
        }
      />
    </ListItem>
  );
};

const StyledListItemAvatar = styled(ListItemAvatar)(() => ({
  marginRight: '20px',
}));

export default CommentItem;
