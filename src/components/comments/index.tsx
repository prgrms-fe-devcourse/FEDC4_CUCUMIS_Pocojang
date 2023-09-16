import { List } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import { FormattedComment } from '@/types';

interface Props {
  comments: FormattedComment[];
  url: string;
  onClick: (url: string, userId: string) => void;
}

const Comments = ({ comments, onClick, url }: Props) => {
  return (
    <List disablePadding>
      {comments.map(({ author, comment, userId, AvatarProps }, i) => (
        <ItemWithAvatar
          name={author}
          message={comment}
          key={i}
          isComment={true}
          AvatarProps={{
            ...AvatarProps,
            onClick: () => onClick(url, userId),
          }}
          isLastItem={i === comments.length - 1}
        />
      ))}
    </List>
  );
};

export default Comments;
