import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const userLike = likes.some((like) => like.user === userId);
    setIsHeartClicked(userLike);
  }, [userId, likes]);

  const handleHeartSend = async () => {
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
    console.log('click', postId);
    const userLike = likes.find((like) => like.user === userId);
    if (userLike) {
      const res = await cancelLikePost({ id: userLike._id });
      console.log(res);
    }
  };

  return isHeartClicked ? (
    <FavoriteIcon onClick={handleHeartCancel} />
  ) : (
    <FavoriteBorderIcon onClick={handleHeartSend} />
  );
};

export default Likes;
