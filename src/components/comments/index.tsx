import { List } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import { FormattedComment } from '@/types';

import BasicChip from '../shared/chip';
import useComment from './useComment';

interface Props {
  postId: string;
  comments: FormattedComment[];
  url: string;
  onClick: (url: string, userId: string) => void;
}

const Comments = ({ postId, comments, onClick, url }: Props) => {
  const { userId, handleDeleteClick } = useComment({ postId });

  return (
    <List disablePadding>
      {comments.map(
        ({ author, comment, userId: writerId, commentId, AvatarProps }, i) => (
          <ItemWithAvatar
            name={author}
            message={comment}
            key={i}
            isComment={true}
            AvatarProps={{
              ...AvatarProps,
              onClick: () => onClick(url, writerId),
            }}
            isLastItem={i === comments.length - 1}
          >
            {userId === writerId && (
              <BasicChip
                label="삭제"
                size="small"
                variant="outlined"
                onClick={() => handleDeleteClick(commentId)}
              />
            )}
          </ItemWithAvatar>
        ),
      )}
    </List>
  );
};

export default Comments;
