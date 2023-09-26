import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { inputSelector } from '@/stores/layout';
import { createComment, deleteComment } from '@/api/comments';
import { sendNotification } from '@/api/notifications';
import {
  isLoadingSelector,
  projectDetailSelector,
} from '@/stores/projectDetail/selector';
import { LOGIN_URL, PROFILE_URL } from '@/consts/routes';
import { tokenSelector } from '@/stores/auth/selector';
import { userIdSelector } from '@/stores/auth';
import { setIsLoading } from '@/stores/projectDetail';

const useComment = () => {
  const dispatch = useAppDispatch();
  const { developerId, projectId } = useParams();
  const { post } = useAppSelector(projectDetailSelector);
  const input = useAppSelector(inputSelector);
  const token = useAppSelector(tokenSelector);
  const userId = useAppSelector(userIdSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const isFetching = useRef(false);
  const setIsFetching = (state: boolean) => {
    isFetching.current = state;
  };

  const navigate = useNavigate();

  const handleDeleteClick = async (id: string) => {
    dispatch(setIsLoading(true));

    try {
      await deleteComment({ id });
    } catch (error) {
      window.alert('댓글 삭제에 실패하였습니다');
    } finally {
      dispatch(setIsLoading(false));

      navigate(0);
    }
  };

  const handleAvatarClick = (id: string) => {
    navigate(PROFILE_URL + id);
  };

  useEffect(() => {
    const submitComment = async () => {
      console.log(token, input, developerId, projectId);
      if (!token) {
        window.alert('로그인이 필요합니다');

        navigate(LOGIN_URL);

        return;
      }

      dispatch(setIsLoading(true));
      // if (!developerId && !projectId) return;

      try {
        const res = await createComment({
          comment: input,
          postId: (developerId || projectId) as string,
        });

        await sendNotification({
          notificationType: 'COMMENT',
          notificationTypeId: res._id,
          userId: res.author._id as string,
          postId: res.post,
        });
      } catch (error) {
        window.alert('댓글 달기에 실패하였습니다');
      } finally {
        dispatch(setIsLoading(false));

        // navigate(0);
      }
    };
    if (isFetching.current || input.length < 1) return;
    submitComment();
  }, [input, developerId, navigate, dispatch, projectId, token]);

  useEffect(() => {
    setIsFetching(isLoading);
  }, [isLoading]);

  return {
    comments: post.comments,
    userId,
    handleDeleteClick,
    handleAvatarClick,
  };
};

export default useComment;
