import { useEffect } from 'react';

import { PostType, UserType } from '@/types';
import { getChannelPosts } from '@/api/posts/channel/channelId';
import { getOnlineUsers } from '@/api/users/onlineUsers';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  developerListSelector,
  onlineUserListSelector,
} from '@/stores/developers/selector';
import { setDeveloperList, setOnlineUserList } from '@/stores/developers';

//TODO parse, api 에러 처리, 무한스크롤 적용, api 동시 호출

const DEVELOPER_CHANNEL_ID = '650557d36a9d603a4d150e7d';

const useDevelopers = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getOnlineUsers()
      .then(parseOnlineUserList)
      .then((list) => dispatch(setOnlineUserList(list)));
    getChannelPosts({}, DEVELOPER_CHANNEL_ID)
      .then(parseDeveloperPosts)
      .then((posts) => {
        dispatch(setDeveloperList(posts));
      });
  }, [dispatch]);

  const developerList = useAppSelector(developerListSelector);
  const onlineUserList = useAppSelector(onlineUserListSelector);

  return {
    onlineDevelopers: onlineUserList,
    developers: developerList,
  };
};

export default useDevelopers;

const parseDeveloperPosts = (list: PostType[]) => {
  return list.map((post) => {
    const { _id, author, title } = post;
    const { oneLiner, techStack, details } = JSON.parse(title);
    const slicedTechStack = techStack.slice(0, 3);
    return {
      _id,
      oneLiner,
      description: details,
      name: author.fullName,
      techStack: slicedTechStack,
      AvatarProps: { imgSrc: author.image, isUserOn: author.isOnline },
    };
  });
};

const parseOnlineUserList = (list: UserType[]) => {
  return list.map((user) => {
    const { _id, fullName, image, isOnline } = user;
    return {
      _id,
      label: fullName,
      AvatarProps: { imgSrc: image, isUserOn: isOnline },
    };
  });
};
