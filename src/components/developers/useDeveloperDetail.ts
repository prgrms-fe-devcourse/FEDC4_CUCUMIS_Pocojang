import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { setIsLoading, setPost } from '@/stores/projectDetail';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setUser, userIdSelector, isLoginSelector } from '@/stores/auth';
import {
  isLoadingSelector,
  projectDetailSelector,
} from '@/stores/projectDetail/selector';
import type {
  PostType,
  FormattedPost,
  DeveloperContent,
  FollowType,
} from '@/types';
import { getPost, deletePost } from '@/api/posts';
import { getUser } from '@/api/user';
import { followUser, unFollowUser } from '@/api/follow';
import { sendNotification } from '@/api/notifications';
import {
  DEVELOPER_URL,
  DM_URL,
  PROFILE_MODIFY_URL,
  PROFILE_URL,
} from '@/consts/routes';
import { userFollowingSelector } from '@/stores/auth/selector';
import handleAxiosError from '@/utils/axiosError';
import { setVisitingUser } from '@/stores/layout';

const useDeveloperDetail = () => {
  const { developerId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = useAppSelector(userIdSelector);
  const userFollowingList = useAppSelector(userFollowingSelector);
  const isLoggedIn = useAppSelector(isLoginSelector);
  const { post } = useAppSelector(projectDetailSelector<DeveloperContent>);
  const isLoading = useAppSelector(isLoadingSelector);

  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFollowButtonClicked, setIsFollowButtonClicked] = useState(false);
  const optimisticRef = useRef(false);

  const handleAvatarClick = () => {
    navigate(PROFILE_URL + post.author._id);
    dispatch(setVisitingUser(post.author));
  };

  const handleSettingClick = () => {
    navigate(PROFILE_MODIFY_URL);
  };

  const handleDMClick = () => {
    navigate(DM_URL + post.author._id);
    dispatch(setVisitingUser(post.author));
  };

  const handleDeleteClick = async () => {
    const isAbleToDelete = confirm('정말로 삭제하시겠습니까?');

    if (isAbleToDelete && developerId) {
      try {
        const res = await deletePost({ id: developerId });

        res && navigate(DEVELOPER_URL, { replace: true });
      } catch (error) {
        window.alert('포스트 삭제에 실패하였습니다');
      }
    }
  };

  const handleFollowClick = async () => {
    setIsFollowButtonClicked(true);
    optimisticRef.current = true;
    try {
      if (isUserFollowing) {
        setIsUserFollowing(false);

        const followerIDList = post.author.followers;

        if (followerIDList) {
          const followId = userFollowingList.find(({ _id }) =>
            followerIDList.includes(_id),
          );

          followId && (await unFollowUser({ id: followId._id }));
        }
      } else {
        if (post.author._id) {
          setIsUserFollowing(true);

          const res = await followUser({ userId: post.author._id });

          await sendNotification({
            notificationType: 'FOLLOW',
            notificationTypeId: res._id,
            userId: post.author._id,
          });
        }
      }
    } catch (error) {
      window.alert('팔로우 처리에 실패하였습니다');
    } finally {
      try {
        if (developerId) {
          const rs = await getPost(developerId);

          const formattedPost = handlePostFormat(rs);

          dispatch(setPost(formattedPost));
        }
        const newUserInfo = await getUser(userId);
        dispatch(setUser(newUserInfo));
      } catch (error) {
        console.log(error);
      } finally {
        setIsFollowButtonClicked(false);
      }
    }
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      dispatch(setIsLoading(true));

      try {
        const rs = await getPost(postId);

        const formattedPost = handlePostFormat(rs);

        dispatch(setPost(formattedPost));
      } catch (error) {
        const axiosErrorMessage = handleAxiosError(error as Error);

        setErrorMessage(axiosErrorMessage);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    developerId && fetchPost(developerId);
  }, [developerId, fetchPost]);

  useEffect(() => {
    const isFollowedByUser = getIsFollowedByUser(post, userFollowingList);

    if (!optimisticRef.current) setIsUserFollowing(isFollowedByUser);
  }, [post, userFollowingList, userId]);

  useEffect(() => {
    if (errorMessage) {
      throw new AxiosError(errorMessage);
    }
  }, [errorMessage]);

  return {
    developerId,
    handleSettingClick,
    handleDMClick,
    handleAvatarClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor: post.author._id === userId,
    isUserFollowing,
    isLoading,
    isLoggedIn,
    isFollowButtonClicked,
    ...post,
  };
};

const handlePostFormat = (rs: PostType) => {
  const { author, comments, _id, image, createdAt, likes } = rs;
  const { oneLiner, techStack, position, details } = JSON.parse(rs.title);

  const formattedComments = comments.map(({ _id, comment, author }) => ({
    AvatarProps: {
      imgSrc: author.image,
      isUserOn: author.isOnline,
    },
    author: author.fullName,
    comment,
    userId: author._id,
    commentId: _id,
  }));

  const formattedPost: Partial<FormattedPost<DeveloperContent>> = {
    likes,
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

const getIsFollowedByUser = (
  post: FormattedPost<DeveloperContent>,
  userFollowingList: FollowType[],
) => {
  if (post.author.followers) {
    const authorFollowerIDList = post.author.followers;

    const isFollowedByUser = userFollowingList.some(({ _id }) =>
      authorFollowerIDList.includes(_id),
    );
    return isFollowedByUser;
  }
  return false;
};

export default useDeveloperDetail;
