import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { layoutSelector } from '@/stores/layout';
import { createComment, deleteComment } from '@/api/comments';
import { sendNotification } from '@/api/notifications';
import { projectDetailSelector } from '@/stores/projectDetail/selector';
import { LOGIN_URL, PROFILE_URL } from '@/consts/routes';
import { tokenSelector } from '@/stores/auth/selector';
import { userIdSelector, userInfoSelector } from '@/stores/auth';
import {
  setAddComment,
  setDeleteComment,
  setUpdateComment,
} from '@/stores/projectDetail';

const useComment = () => {
  const dispatch = useAppDispatch();

  const { post } = useAppSelector(projectDetailSelector);
  const { input } = useAppSelector(layoutSelector);
  const token = useAppSelector(tokenSelector);
  const userId = useAppSelector(userIdSelector);
  const userInfo = useAppSelector(userInfoSelector);

  const navigate = useNavigate();

  const handleDeleteClick = async (id: string) => {
    dispatch(setDeleteComment(id));
    try {
      await deleteComment({ id });
    } catch (error) {
      window.alert('댓글 삭제에 실패하였습니다');
    }
  };

  const handleAvatarClick = (id: string) => {
    navigate(PROFILE_URL + id);
  };

  const submitComment = useCallback(async () => {
    if (!token || !userInfo) {
      window.alert('로그인이 필요합니다');

      navigate(LOGIN_URL);

      return;
    }

    const { isOnline, image, fullName, _id } = userInfo;

    dispatch(
      setAddComment({
        AvatarProps: {
          imgSrc: image,
          isUserOn: isOnline,
        },
        comment: input,
        author: fullName,
        commentId: 'temp' + input,
        userId: _id,
      }),
    );

    try {
      const res = await createComment({
        comment: input,
        postId: post.postId,
      });

      dispatch(setUpdateComment({ newId: res._id, oldId: 'temp' + input }));

      await sendNotification({
        notificationType: 'COMMENT',
        notificationTypeId: res._id,
        userId: post.author._id as string,
        postId: post.postId,
      });
    } catch (error) {
      window.alert('댓글 달기에 실패하였습니다');
    }
  }, [
    token,
    input,
    navigate,
    post.author._id,
    post.postId,
    dispatch,
    userInfo,
  ]);

  useEffect(() => {
    input && submitComment();
  }, [input, submitComment]);

  return {
    comments: post.comments,
    userId,
    handleDeleteClick,
    handleAvatarClick,
  };
};

export default useComment;
