import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userIdSelector } from '@/stores/auth';
import {
  likesSelector,
  postIdSelector,
  authorIdSelector,
} from '@/stores/projectDetail/selector';
import { cancelLikePost, likePost } from '@/api/likes';
import { sendNotification } from '@/api/notifications';
import { setDeleteLike } from '@/stores/projectDetail';

const Likes = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const likes = useAppSelector(likesSelector);
  const postId = useAppSelector(postIdSelector);
  const authorId = useAppSelector(authorIdSelector);

  const [tempHeartId, setTempHeartId] = useState('');

  const [heartState, setHearState] = useState({
    isHeartClicked: false,
    count: likes.length,
    isClickedNow: false,
  });
  const handleSendHeart = async () => {
    if (!userId) {
      return;
    }
    setHearState((prev) => ({
      isHeartClicked: true,
      count: prev.count + 1,
      isClickedNow: true,
    }));

    try {
      const res = await likePost({ postId });
      setTempHeartId(res._id);
      await sendNotification({
        notificationType: 'LIKE',
        notificationTypeId: res._id,
        userId: authorId,
        postId,
      });
    } catch (error) {
      window.alert('좋아요 처리에 실패하였습니다');
    } finally {
      setHearState((prev) => ({
        ...prev,
        isClickedNow: false,
      }));
    }
  };

  const handleCancelHeart = async () => {
    if (!userId) {
      return;
    }
    setHearState((prev) => ({
      isHeartClicked: false,
      count: prev.count - 1,
      isClickedNow: true,
    }));

    const userLikeInfo = likes.find((like) => like.user === userId);

    if (userLikeInfo) {
      try {
        await cancelLikePost({ id: userLikeInfo._id });
        dispatch(setDeleteLike({ userId }));
      } catch (error) {
        window.alert('좋아요 처리에 실패하였습니다');
      } finally {
        setHearState((prev) => ({
          ...prev,
          isClickedNow: false,
        }));
      }
    } else {
      try {
        await cancelLikePost({ id: tempHeartId });
      } catch (error) {
        window.alert('좋아요 처리에 실패하였습니다');
      } finally {
        setHearState((prev) => ({
          ...prev,
          isClickedNow: false,
        }));
      }
    }
  };

  useEffect(() => {
    const isUserLike = likes.some((like) => like.user === userId);

    setHearState((prev) => ({
      ...prev,
      count: likes.length,
      isHeartClicked: isUserLike,
    }));
  }, [userId, likes]);

  return (
    <IconContainer
      direction="row"
      alignItems="center"
      spacing={0.5}
      isUser={!!userId}
      isClickedNow={heartState.isClickedNow}
    >
      {heartState.isHeartClicked ? (
        <FavoriteIcon onClick={handleCancelHeart} color="primary" />
      ) : (
        <FavoriteBorderIcon onClick={handleSendHeart} color="primary" />
      )}
      <Typography color="primary">{heartState.count}</Typography>
    </IconContainer>
  );
};

const IconContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isUser' && prop !== 'isClickedNow',
})(({ isUser, isClickedNow }: { isUser: boolean; isClickedNow: boolean }) => ({
  cursor: isUser ? (isClickedNow ? 'wait' : 'pointer') : 'not-allowed',
}));

export default Likes;
