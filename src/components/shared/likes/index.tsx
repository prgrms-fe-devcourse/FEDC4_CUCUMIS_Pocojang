import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Stack, Typography } from '@mui/material';

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
  console.log(userId, likes);
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleHeartSend = async () => {
    if (!userId) return;
    console.log('s', postId);

    const res = await likePost({ postId });

    await sendNotification({
      notificationType: 'LIKE',
      notificationTypeId: res._id,
      userId: authorId,
      postId,
    });
  };

  const handleHeartCancel = async () => {
    if (!userId) return;
    console.log('click', postId);
    const userLikeInfo = likes.find((like) => like.user === userId);
    if (userLikeInfo) {
      const res = await cancelLikePost({ id: userLikeInfo._id });
      console.log(res);
    }
  };

  useEffect(() => {
    const isUserLike = likes.some((like) => like.user === userId);
    setIsHeartClicked(isUserLike);
  }, [userId, likes]);

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {isHeartClicked ? (
        <FavoriteIcon onClick={handleHeartCancel} color="primary" />
      ) : (
        <FavoriteBorderIcon onClick={handleHeartSend} color="primary" />
      )}
      <Typography color="primary">{likes.length}</Typography>
    </Stack>
  );
};

export default Likes;
