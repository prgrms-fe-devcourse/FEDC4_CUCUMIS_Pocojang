import { List } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';

export type Comment = {
  userId: string;
  author: string;
  createdAt?: string;
  comment: string;
  AvatarProps: {
    imgSrc?: string;
    isUserOn?: boolean;
  };
  isLastItem?: boolean;
};

interface Props {
  comments: Comment[];
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
