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

interface ProjectDetailHookParameters {
  onGetFail: (error: unknown) => void;
  onSendFail: (error: unknown) => void;
}

const useProjectDetail = ({
  onGetFail,
  onSendFail,
}: ProjectDetailHookParameters) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();
  const { post } = useAppSelector(projectDetailSelector<ProjectContent>);
  const userId = useAppSelector(userIdSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleAvatarClick = () => {
    navigate(PROFILE_URL + post.author._id);
  };

  const handleSettingClick = () => {
    navigate(PROJECT_MODIFYL_URL + projectId);
  };

  const handleDeleteClick = async () => {
    const ableToDelete = confirm('정말로 삭제하시겠습니까?');
    // 모달로 변경 필요?

    if (ableToDelete && projectId) {
      try {
        const res = await deletePost({ id: projectId });

        res && navigate(PROJECT_URL);
      } catch (error) {
        onSendFail(error);
      }
    }
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const rs = await getPost(postId);

        const formattedPost = handlePostFormat(rs);

        dispatch(setPost(formattedPost));
      } catch (error) {
        onGetFail(error);
        setError('존재하지 않는 포스트입니다');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onGetFail],
  );

  useEffect(() => {
    if (projectId) {
      fetchPost(projectId);
    }
  }, [projectId, dispatch, fetchPost, onGetFail]);

  useEffect(() => {
    if (error) {
      throw new AxiosError(error);
    }
  }, [error]);

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
