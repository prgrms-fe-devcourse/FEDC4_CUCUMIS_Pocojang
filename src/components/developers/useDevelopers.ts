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

interface useDevelopersProps {
  onGetFail: (error: unknown) => void;
}

const useDevelopers = ({ onGetFail }: useDevelopersProps) => {
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
  const { page, pageEnd } = useInfiniteScroll({ isFetching, options: {} });

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  useEffect(() => {
    const searchDevelopers = async (value: string) => {
      setIsFetching(true);
      setIsEndOfList(true);
      try {
        const searchResult = await searchAll(value).then((result: unknown) =>
          parseSearchResult(result as Post[]),
        );
        dispatch(setSearchList(searchResult));
      } catch (error) {
        onGetFail(error);
      } finally {
        setIsFetching(false);
      }
    };

    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    const encoded = encodeURIComponent(value);
    searchDevelopers(encoded);
  }, [dispatch, headerSearchValue, onGetFail]);

  useEffect(() => {
    if (isLoading.current) return;
    const fetch = async () => {
      setIsFetching(true);
      try {
        const result = await getChannelPosts(CHANNEL_ID.DEVELOPER, {
          offset: page * 7,
          limit: 7,
        });
        if (result.length === 0) {
          setIsEndOfList(true);
        }
        const parsed = parseDeveloperPosts(result);
        dispatch(setDeveloperList(parsed));
      } catch (error) {
        onGetFail(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetch();
  }, [dispatch, page, onGetFail]);

  useEffect(() => {
    try {
      getOnlineUsers()
        .then(parseOnlineUserList)
        .then((list) => dispatch(setOnlineUserList(list)));
    } catch (error) {
      onGetFail(error);
    }
    return () => {
      dispatch(cleanDeveloperList());
    };
  }, [dispatch, onGetFail]);

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
