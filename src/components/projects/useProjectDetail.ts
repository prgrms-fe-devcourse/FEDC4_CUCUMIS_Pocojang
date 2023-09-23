import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import { getPost, deletePost } from '@/api/posts';
import { setPost } from '@/stores/projectDetail';
import { userIdSelector } from '@/stores/auth';
import { useAppSelector } from '@/stores/hooks';
import { projectDetailSelector } from '@/stores/projectDetail/selector';
import type { PostType, FormattedPost, ProjectContent } from '@/types';
import { PROFILE_URL, PROJECT_MODIFYL_URL, PROJECT_URL } from '@/consts/routes';
import handleAxiosError from '@/utils/axiosError';

const useProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();
  const { post } = useAppSelector(projectDetailSelector<ProjectContent>);
  const userId = useAppSelector(userIdSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAvatarClick = () => {
    navigate(PROFILE_URL + post.author._id);
  };

  const handleSettingClick = () => {
    navigate(PROJECT_MODIFYL_URL + projectId);
  };

  const handleDeleteClick = async () => {
    const ableToDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (ableToDelete && projectId) {
      try {
        const res = await deletePost({ id: projectId });

        res && navigate(PROJECT_URL, { replace: true });
      } catch (error) {
        window.alert('포스트 삭제에 실패하였습니다');
      }
    }
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const rs = await getPost(postId);

        const formattedPost = handlePostFormat(rs);

        dispatch(setPost(formattedPost));
      } catch (error: unknown) {
        const axiosErrorMessage = handleAxiosError(error as Error);

        setErrorMessage(axiosErrorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (projectId) {
      fetchPost(projectId);
    }
  }, [projectId, fetchPost]);

  useEffect(() => {
    if (errorMessage) {
      throw new AxiosError(errorMessage);
    }
  }, [errorMessage]);

  return {
    projectId,
    handleAvatarClick,
    handleSettingClick,
    handleDeleteClick,
    isAuthor: post.author._id === userId,
    isLoading,
    ...post,
  };
};

const handlePostFormat = (rs: PostType) => {
  const { author, comments, _id, image, createdAt } = rs;
  const { title, requirements } = JSON.parse(rs.title);

  const formattedComments = comments.map(({ _id, comment, author }) => ({
    AvatarProps: {
      imgSrc: author.image,
    },
    author: author.fullName,
    comment,
    userId: author._id,
    commentId: _id,
  }));

  const formattedPost: Partial<FormattedPost<ProjectContent>> = {
    postId: _id,
    comments: formattedComments,
    image: image,
    author,
    createdAt,
    contents: {
      title,
      requirements,
    },
  };

  return formattedPost;
};

export default useProjectDetail;
