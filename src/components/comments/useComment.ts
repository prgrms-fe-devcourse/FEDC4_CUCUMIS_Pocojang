import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/stores/hooks';
import { layoutSelector } from '@/stores/layout';
import { createComment, deleteComment } from '@/api/comments';
import session from '@/utils/sessionStorage';
import type { UserType } from '@/types';
import SESSION_STORAGE from '@/consts/sessionStorage';
import { sendNotification } from '@/api/notifications';

interface UseCommentProps {
  authorId: string;
  postId: string;
}

const useComment = ({ authorId, postId }: UseCommentProps) => {
  const { input } = useAppSelector(layoutSelector);
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

  useEffect(() => {
    const user = session.getItem<UserType>(SESSION_STORAGE.USER);

    if (user) {
      const { _id } = user;

      setUserId(_id);
    }
  }, []);

  useEffect(() => {
    const submitComment = async () => {
      try {
        const res = await createComment({
          comment: input,
          postId,
        });

        await sendNotification({
          notificationType: 'COMMENT',
          notificationTypeId: res._id,
          userId: authorId,
          postId,
        });

        navigate(0);
      } catch (error) {
        console.log(error);
      }
    };

    input && submitComment();
  }, [input, postId, userId, authorId, navigate]);

  return {
    userId,
    handleDeleteClick,
  };
};

export default useComment;
