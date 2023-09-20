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
//TODOapi 에러 처리

const useDevelopers = () => {
  const dispatch = useAppDispatch();

  const developerList = useAppSelector(developerListSelector);
  const onlineUserList = useAppSelector(onlineUserListSelector);
  const headerSearchValue = useAppSelector(inputSelector);
  const testList = useRef(developerList);
  const { page, pageEnd } = useInfiniteScroll({
    options: { threshold: 0.2 },
  });
  useEffect(() => {
    testList.current = developerList;
  }, [developerList]);
  useEffect(() => {
    getOnlineUsers()
      .then(parseOnlineUserList)
      .then((list) => dispatch(setOnlineUserList(list)));
  }, [dispatch]);

  useEffect(() => {
    getChannelPosts(CHANNEL_ID.DEVELOPER, { offset: page * 5, limit: 5 })
      .then(parseDeveloperPosts)
      .then((posts) => {
        dispatch(setDeveloperList([...testList.current, ...posts]));
      });
  }, [dispatch, page]);

  useEffect(() => {
    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    //TODO 검색하기, api 동기적으로 만들고 로딩처리
  }, [headerSearchValue]);

  return {
    target: pageEnd,
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
