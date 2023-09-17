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
import { getUserId } from '@/api/posts/delete';
import { getUserId as getUserInfo } from '@/api/users/userId';
import { followUser } from '@/api/follow/create';
import { unFollowUser } from '@/api/follow/delete';

const useDeveloperDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { developerId } = useParams();
  const { post } = useAppSelector(projectDetailSelector);

  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
  };

  const handleDeleteClick = async (id: string) => {
    const ableToDelete = confirm('정말로 삭제하시겠습니까?');

    if (ableToDelete) {
      const res = await getUserId({ id });

      res && navigate('/developers');
    }
  };

  const handleFollowClick = async () => {
    if (isFollowing) {
      try {
        const followerID = post.author.followers;
        const followId = userInfo?.following.find(({ _id }) =>
          followerID.includes(_id),
        );

        if (followId) {
          const res = await unFollowUser({ id: followId._id });
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await followUser({ userId: post.author._id });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
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
    const followerID = post.author.followers;

    const getUserInfoById = async () => {
      try {
        const newUserInfo = await getUserInfo(userId);
        setUserInfo(newUserInfo);

        const isFollowedByUser = newUserInfo.following.some(({ _id }) =>
          followerID.includes(_id),
        );

        setIsFollowing(isFollowedByUser);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfoById();
  }, [post, userId]);

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async (postId: string) => {
      try {
        const rs = await getPostId(postId);
        console.log(rs);
        handlePost(rs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handlePost = (rs: PostType) => {
      const { author, comments, _id, image, createdAt } = rs;
      const { oneLiner, techStack, position, details } = JSON.parse(rs.title);

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
          oneLiner,
          techStack,
          position,
          details,
        },
      };

      dispatch(setPost(formatedPost));
    };

    if (developerId) {
      fetchPost(developerId);
    }
    // 예외처리 잘못된 요청
  }, [developerId, dispatch]);

  return {
    developerId,
    handleClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor: post.author._id === userId,
    isLoading,
    isFollowing,
    ...post,
  };
};

export default useDeveloperDetail;
