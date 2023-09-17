import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getPostId } from '@/api/posts/postId';
import { setPost } from '@/stores/projectDetail';
import { useAppSelector } from '@/stores/hooks';
import { projectDetailSelector } from '@/stores/projectDetail/selector';
import type {
  PostType,
  UserType,
  FormattedPost,
  ProjectContent,
} from '@/types';
import session from '@/utils/sessionStorage';
import SESSION_STORAGE from '@/consts/sessionStorage';
import { getUserId } from '@/api/posts/delete';

const useProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();
  const { post } = useAppSelector(projectDetailSelector);

  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
  };

  const handleDeleteClick = async (id: string) => {
    const ableToDelete = confirm('정말로 삭제하시겠습니까?');

    if (ableToDelete) {
      const res = await getUserId({ id });

      res && navigate('/projects');
    }
  };

  useEffect(() => {
    const user = session.getItem<UserType>(SESSION_STORAGE.USER);

    if (user) {
      const { _id } = user;
      setUserId(_id);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async (postId: string) => {
      try {
        const rs = await getPostId(postId);

        handlePost(rs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handlePost = (rs: PostType) => {
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

      const formatedPost: Partial<FormattedPost<ProjectContent>> = {
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

      dispatch(setPost(formatedPost));
    };

    if (projectId) {
      fetchPost(projectId);
    }
    // 예외처리 잘못된 요청
  }, [projectId, dispatch]);

  return {
    projectId,
    handleClick,
    handleDeleteClick,
    isAuthor: post.author._id === userId,
    isLoading,
    ...post,
  };
};

export default useProjectDetail;
