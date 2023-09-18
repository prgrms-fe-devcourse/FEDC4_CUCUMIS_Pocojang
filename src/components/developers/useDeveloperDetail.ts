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
import { sendNotifications } from '@/api/notifications/create';

const useDeveloperDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { developerId } = useParams();
  const { post } = useAppSelector(projectDetailSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useState({
    isFollowing: false,
    isLoggedIn: false,
  });
  const [userInfo, setUserInfo] = useState<UserType>();

  const handleClick = (url: string, id: string = '') => {
    navigate(url + id);
  };

  const handleDeleteClick = async (id: string) => {
    const isAbleToDelete = confirm('정말로 삭제하시겠습니까?');

    if (isAbleToDelete) {
      const res = await getUserId({ id });

      res && navigate('/developers');
    }
  };

  const handleFollowClick = async () => {
    if (buttonState.isFollowing) {
      try {
        const followerID = post.author.followers;
        const followId = userInfo?.following.find(({ _id }) =>
          followerID.includes(_id),
        );

        if (followId) {
          await unFollowUser({ id: followId._id });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await followUser({ userId: post.author._id });

        await sendNotifications({
          notificationType: 'FOLLOW',
          notificationTypeId: res._id,
          userId: post.author._id,
          postId: null,
        });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      if (userInfo?._id) {
        const newUserInfo = await getUserInfo(userInfo._id);
        session.setItem(SESSION_STORAGE.USER, newUserInfo);
      }
    } catch (error) {
      console.log(error);
    }

    navigate(0);
  };

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

  useEffect(() => {
    const user = session.getItem<UserType>(SESSION_STORAGE.USER);

    if (user && post.author.followers) {
      setUserInfo(user);

      const followerID = post.author.followers;
      const isFollowedByUser = user.following?.some(({ _id }) =>
        followerID.includes(_id),
      );
      setButtonState({ isLoggedIn: true, isFollowing: isFollowedByUser });
    }

    if (!user) {
      setButtonState((prev) => ({ ...prev, isLoggedIn: false }));
    }
  }, [post]);

  return {
    developerId,
    handleClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor: post.author._id === userInfo?._id,
    isLoading,
    ...buttonState,
    ...post,
  };
};

export default useDeveloperDetail;
