import { useEffect, useRef } from 'react';

import { PostType, UserType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  developerListSelector,
  onlineUserListSelector,
} from '@/stores/developers/selector';
import { setDeveloperList, setOnlineUserList } from '@/stores/developers';
import { getOnlineUsers } from '@/api/user';
import { getChannelPosts } from '@/api/posts';
import { inputSelector } from '@/stores/layout/selector';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CHANNEL_ID from '@/consts/channels';
//TODOapi 에러 처리, 채널id 상수화 , 검색

const useDevelopers = () => {
  const dispatch = useAppDispatch();

  const developerList = useAppSelector(developerListSelector);
  const onlineUserList = useAppSelector(onlineUserListSelector);
  const headerSearchValue = useAppSelector(inputSelector);
  const target = useRef<HTMLDivElement>(null);
  const { page } = useInfiniteScroll({
    target,
    endPoint: 5,
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    getOnlineUsers()
      .then(parseOnlineUserList)
      .then((list) => dispatch(setOnlineUserList(list)));

    getChannelPosts(CHANNEL_ID.DEVELOPER, { offset: 0, limit: page * 10 })
      .then(parseDeveloperPosts)
      .then((posts) => {
        dispatch(setDeveloperList(posts));
      });
  }, [dispatch, page]);

  useEffect(() => {
    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    //TODO 검색하기
  }, [headerSearchValue]);

  return {
    target,
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
