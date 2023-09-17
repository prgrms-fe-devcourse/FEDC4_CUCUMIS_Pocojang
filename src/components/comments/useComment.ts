import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/stores/hooks';
import { layoutSelector } from '@/stores/layout';
import { createComments } from '@/api/comments/create';
import { deleteComments } from '@/api/comments/delete';
import session from '@/utils/sessionStorage';
import type { UserType } from '@/types';
import SESSION_STORAGE from '@/consts/sessionStorage';

interface UseCommentProps {
  postId: string;
}

const useComment = ({ postId }: UseCommentProps) => {
  const { input } = useAppSelector(layoutSelector);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteComments({ id });
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
        await createComments({
          comment: input,
          postId,
        });
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    };

    input && submitComment();
  }, [input, postId, navigate]);

  return {
    userId,
    handleDeleteClick,
  };
};

export default useComment;
