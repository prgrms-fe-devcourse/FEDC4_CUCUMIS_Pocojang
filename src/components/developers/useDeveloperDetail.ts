import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { getPost, deletePost } from '@/api/posts';
import { getUser } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';
import { sendNotification } from '@/api/notifications';
import {
  DEVELOPER_URL,
  DM_URL,
  PROFILE_URL,
  SETTINGS_URL,
} from '@/consts/routes';

const useDeveloperDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { developerId } = useParams();
  const { post } = useAppSelector(projectDetailSelector<DeveloperContent>);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useState({
    isFollowing: false,
    isLoggedIn: false,
  });
  const [userInfo, setUserInfo] = useState<UserType>();

  const handleAvatarClick = () => {
    navigate(PROFILE_URL + developerId);
  };

  const handleSettingClick = () => {
    navigate(SETTINGS_URL);
  };

  const handleDMClick = () => {
    navigate(DM_URL + developerId);
  };

  const handleDeleteClick = async () => {
    const isAbleToDelete = confirm('정말로 삭제하시겠습니까?');

    if (isAbleToDelete && developerId) {
      const res = await deletePost({ id: developerId });

      res && navigate(DEVELOPER_URL);
    }
  };

  const handleFollowClick = async () => {
    try {
      if (buttonState.isFollowing) {
        const followerIDList = post.author.followers;

        if (followerIDList) {
          const followId = userInfo?.following.find(({ _id }) =>
            followerIDList.includes(_id),
          );

          if (followId) {
            await unFollowUser({ id: followId._id });
          }
        }
      } else {
        if (post.author._id) {
          const res = await followUser({ userId: post.author._id });

          await sendNotification({
            notificationType: 'FOLLOW',
            notificationTypeId: res._id,
            userId: post.author._id,
          });
        }
      }

      if (userInfo?._id) {
        const newUserInfo = await getUser(userInfo._id);
        session.setItem(SESSION_STORAGE.USER, newUserInfo);
      }
    } catch (error) {
      console.log(error);
    }

    navigate(0);
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const rs = await getPost(postId);

        const formattedPost = handlePostFormat(rs);

        dispatch(setPost(formattedPost));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setIsLoading(true);

    if (developerId) {
      fetchPost(developerId);
    }
  }, [developerId, fetchPost, dispatch]);

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
    handleSettingClick,
    handleDMClick,
    handleAvatarClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor: post.author._id === userInfo?._id,
    isLoading,
    ...buttonState,
    ...post,
  };
};

const handlePostFormat = (rs: PostType) => {
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

  const formattedPost: Partial<FormattedPost<DeveloperContent>> = {
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
  return formattedPost;
};

export default useDeveloperDetail;
