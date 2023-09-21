import { useEffect, useState } from 'react';

import { PostType, UserType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  developerListSelector,
  onlineUserListSelector,
} from '@/stores/developers/selector';
import {
  setDeveloperList,
  setOnlineUserList,
  setSearchList,
} from '@/stores/developers';
import { getOnlineUsers } from '@/api/user';
import { getChannelPosts } from '@/api/posts';
import { inputSelector } from '@/stores/layout/selector';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CHANNEL_ID from '@/consts/channels';
import { searchAll } from '@/api/search';

//TODOapi 에러 처리, 1글자 이하이면 경고창이 필요한가?스낵바?

const useDevelopers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const developerList = useAppSelector(developerListSelector);
  const onlineUserList = useAppSelector(onlineUserListSelector);
  const headerSearchValue = useAppSelector(inputSelector);

  const { page, pageEnd } = useInfiniteScroll({
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    getOnlineUsers()
      .then(parseOnlineUserList)
      .then((list) => dispatch(setOnlineUserList(list)));
  }, [dispatch]);

  useEffect(() => {
    getChannelPosts(CHANNEL_ID.DEVELOPER, { offset: page * 5, limit: 5 })
      .then(parseDeveloperPosts)
      .then((posts) => {
        dispatch(setDeveloperList(posts));
      });
  }, [dispatch, page]);

  useEffect(() => {
    const searchProjects = async (value: string) => {
      const searchResult = await searchAll(value).then((result: unknown) =>
        parseSearchResult(result as Post[]),
      );
      dispatch(setSearchList(searchResult));
      setIsLoading(false);
    };

    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    setIsLoading(true);
    setIsSearching(true);
    const encoded = encodeURIComponent(value);
    searchProjects(encoded);

    //TODO 검색하기, api 동기적으로 만들고 로딩처리
  }, [dispatch, headerSearchValue]);

  return {
    isSearching,
    isLoading,
    target: pageEnd,
    onlineDevelopers: onlineUserList,
    developers: developerList,
  };
};

export default useDevelopers;

export const parseDeveloperPosts = (list: PostType[]) => {
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
interface Post {
  channel: string;
  _id: string;
}

const parseSearchResult = async (result: Post[]) => {
  const filteredSet = new Set(
    result
      .filter((item) => item.channel === CHANNEL_ID.DEVELOPER)
      .map((list) => list._id),
  );
  const searchResult = await getChannelPosts(CHANNEL_ID.DEVELOPER, {})
    .then((list: PostType[]) =>
      list.filter((post) => filteredSet.has(post._id)),
    )
    .then(parseDeveloperPosts);
  return searchResult;
};
