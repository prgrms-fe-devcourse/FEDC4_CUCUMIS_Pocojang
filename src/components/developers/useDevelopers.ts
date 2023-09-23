import { useEffect, useState, useRef } from 'react';

import { PostType, UserType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  developerListSelector,
  onlineUserListSelector,
} from '@/stores/developers/selector';
import {
  cleanDeveloperList,
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

//TODO 게시물 사진과 아바타는 author에서 가져와서 넣는다 , 상태는 projects와 유사하다. 공유가 가능한가 ?
const useDevelopers = () => {
  const dispatch = useAppDispatch();

  const developerList = useAppSelector(developerListSelector);
  const onlineUserList = useAppSelector(onlineUserListSelector);
  const headerSearchValue = useAppSelector(inputSelector);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const isLoading = useRef(false);
  const setIsLoading = (state: boolean) => {
    isLoading.current = state;
  };
  const { page, pageEnd } = useInfiniteScroll({
    options: {},
  });

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
    const encoded = encodeURIComponent(value);
    searchProjects(encoded);
  }, [dispatch, headerSearchValue]);

  useEffect(() => {
    // 마지막 페이지 block 처리
    const scrolling = async () => {
      setIsLoading(true);
      await getChannelPosts(CHANNEL_ID.DEVELOPER, {
        offset: page * 5,
        limit: 5,
      })
        .then(parseDeveloperPosts)
        .then((posts) => {
          dispatch(setDeveloperList(posts));
        });
      setIsLoading(false);
    };

    scrolling();
  }, [dispatch, page]);

  useEffect(() => {
    getOnlineUsers()
      .then(parseOnlineUserList)
      .then((list) => dispatch(setOnlineUserList(list)));

    return () => {
      dispatch(cleanDeveloperList());

      setIsEndOfList(false);
      setIsFetching(false);
    };
  }, [dispatch]);

  return {
    isFetching,
    target: pageEnd,
    onlineDevelopers: onlineUserList,
    developers: developerList,
    isEndOfList,
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
