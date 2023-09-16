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
  DeveloperContent,
} from '@/types';
import session from '@/utils/sessionStorage';
import SESSION_STORAGE from '@/consts/sessionStorage';
import useComment from '@/components/comments/useComment';

const CUCUMIS_POSTID = '650573ea09e45a4a41119f42';

const useProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { developerId } = useParams();
  const { post } = useAppSelector(projectDetailSelector);
  const { refreshPage } = useComment({ postId: CUCUMIS_POSTID });

  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
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
      const { oneliner, techstack, position, details } = JSON.parse(rs.title);

      const formattedComments = comments.map(({ _id, comment, author }) => ({
        AvatarProps: {
          imgSrc: author.image,
        },
        author: author.fullName,
        comment,
        userId: author._id,
        commentId: _id,
      }));

      const formatedPost: Partial<FormattedPost<DeveloperContent>> = {
        postId: _id,
        comments: formattedComments,
        image: image,
        author,
        createdAt,
        contents: {
          oneLiner: oneliner,
          techStack: techstack,
          position,
          details,
        },
      };
      console.log(formatedPost);
      dispatch(setPost(formatedPost));
    };

    if (developerId) {
      // fetchPost(developerId);
      fetchPost(CUCUMIS_POSTID);
    }
    // 예외처리 잘못된 요청
  }, [developerId, dispatch, refreshPage]);

  return {
    developerId,
    handleClick,
    isAuthor: post.author._id === userId,
    isLoading,
    ...post,
  };
};

export default useProjectDetail;
