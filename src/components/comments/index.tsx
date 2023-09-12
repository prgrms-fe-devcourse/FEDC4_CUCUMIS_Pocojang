import { List } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';

interface CommentProps {
  _id: string;
  author: string;
  createdAt: string;
  comment: string;
  AvatarProps: {
    isUserOn: boolean;
  };
  isLastItem?: boolean;
}

interface Props {
  comments: CommentProps[];
  url: string;
  onClick: (url: string, _id: string) => void;
}

const Comments = ({ comments, onClick, url }: Props) => {
  return (
    <List disablePadding>
      {comments.map(({ author, comment, _id, AvatarProps }, i) => (
        <ItemWithAvatar
          name={author}
          message={comment}
          key={i}
          isComment={true}
          AvatarProps={{
            ...AvatarProps,
            onClick: () => onClick(url, _id),
          }}
          isLastItem={i === comments.length - 1}
        />
      ))}
    </List>
  );
};

export default Comments;
