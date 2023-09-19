import { List } from '@mui/material';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import { FormattedComment } from '@/types';
import BasicChip from '@/components/shared/chip';
import useComment from '@/components/comments/useComment';

const Comments = () => {
  const { comments, userId, handleDeleteClick, handleAvatarClick } =
    useComment();

  return (
    <List disablePadding>
      {(comments as FormattedComment[]).map(
        ({ author, comment, userId: writerId, commentId, AvatarProps }, i) => (
          <ItemWithAvatar
            name={author}
            message={comment}
            key={commentId}
            isComment={true}
            AvatarProps={{
              ...AvatarProps,
              onClick: () => handleAvatarClick(writerId),
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
