import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useAppSelector } from '@/stores/hooks';
import { userIdSelector } from '@/stores/auth';
import {
  likesSelector,
  postIdSelector,
  authorIdSelector,
} from '@/stores/projectDetail/selector';
import { cancelLikePost, likePost } from '@/api/likes';
import { sendNotification } from '@/api/notifications';

const Likes = () => {
  const userId = useAppSelector(userIdSelector);
  const likes = useAppSelector(likesSelector);
  const postId = useAppSelector(postIdSelector);
  const authorId = useAppSelector(authorIdSelector);

  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleSendHeart = async () => {
    if (!userId || isHeartClicked) {
      return;
    }

    try {
      const res = await likePost({ postId });

      await sendNotification({
        notificationType: 'LIKE',
        notificationTypeId: res._id,
        userId: authorId,
        postId,
      });
    } catch (error) {
      window.alert('좋아요 처리에 실패하였습니다');
    }
  };

  const handleCancelHeart = async () => {
    if (!userId || !isHeartClicked) {
      return;
    }

    const userLikeInfo = likes.find((like) => like.user === userId);

    if (userLikeInfo) {
      try {
        await cancelLikePost({ id: userLikeInfo._id });
      } catch (error) {
        window.alert('좋아요 처리에 실패하였습니다');
      }
    }
  };

  useEffect(() => {
    const isUserLike = likes.some((like) => like.user === userId);

    setIsHeartClicked(isUserLike);
  }, [userId, likes]);

  return (
    <IconContainer
      direction="row"
      alignItems="center"
      spacing={0.5}
      isUser={!!userId}
    >
      {isHeartClicked ? (
        <FavoriteIcon onClick={handleCancelHeart} color="primary" />
      ) : (
        <FavoriteBorderIcon onClick={handleSendHeart} color="primary" />
      )}
      <Typography color="primary">{likes.length}</Typography>
    </IconContainer>
  );
};

const IconContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})(({ isUser }: { isUser: boolean }) => ({
  cursor: isUser ? 'pointer' : 'not-allowed',
}));

export default Likes;
