import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/stores/hooks';
import { layoutSelector } from '@/stores/layout';
import { createComment, deleteComment } from '@/api/comments';
import session from '@/utils/sessionStorage';
import type { UserType } from '@/types';
import SESSION_STORAGE from '@/consts/sessionStorage';
import { sendNotification } from '@/api/notifications';
import { projectDetailSelector } from '@/stores/projectDetail/selector';
import { LOGIN_URL, PROFILE_URL } from '@/consts/routes';
import { tokenSelector } from '@/stores/auth/selector';

const useComment = () => {
  const { post } = useAppSelector(projectDetailSelector);
  const { input } = useAppSelector(layoutSelector);
  const token = useAppSelector(tokenSelector);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteComment({ id });
    } catch (error) {
      console.log(error);
    }
    navigate(0);
  };

  const handleAvatarClick = (id: string) => {
    navigate(PROFILE_URL + id);
  };

  useEffect(() => {
    const user = session.getItem<UserType>(SESSION_STORAGE.USER);

    if (user) {
      const { _id } = user;

      setUserId(_id);
    }
  }, []);

  useEffect(() => {
    const submitComment = async () => {
      if (!token) {
        window.alert('로그인이 필요합니다');

        navigate(LOGIN_URL);

        return;
      }

      try {
        const res = await createComment({
          comment: input,
          postId: post.postId,
        });

        await sendNotification({
          notificationType: 'COMMENT',
          notificationTypeId: res._id,
          userId: post.author._id as string,
          postId: post.postId,
        });

        navigate(0);
      } catch (error) {
        console.log(error);
      }
    };

    input && submitComment();
  }, [token, input, userId, navigate, post.author._id, post.postId]);

  return {
    comments: post.comments,
    userId,
    handleDeleteClick,
    handleAvatarClick,
  };
};

export default useComment;
