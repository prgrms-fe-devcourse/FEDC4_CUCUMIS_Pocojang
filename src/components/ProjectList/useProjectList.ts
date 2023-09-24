import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import {
  cleanProjectList,
  setProjectList,
  setSearchList,
  setIsFetching,
  isFetchingSelector,
} from '@/stores/projects';
import useInfinityScroll from '@/hooks/useInfiniteScroll';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { projectsSelector } from '@/stores/projects/selector';
import { isLoginSelector } from '@/stores/auth';
import { PostType } from '@/types';
import { getChannelPosts } from '@/api/posts';
import { inputSelector } from '@/stores/layout';
import { searchAll } from '@/api/search';
import CHANNEL_ID from '@/consts/channels';
import { PROJECT_MODIFYL_URL } from '@/consts/routes';
export interface ProjectType {
  _id: string;
  image?: string;
  name: string;
  projectTitle: string;
}
interface useProjectListProps {
  onGetFail: (error: unknown) => void;
}

// TODO
const useProjectList = ({ onGetFail }: useProjectListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginSelector);
  const list = useAppSelector(projectsSelector);
  const headerSearchValue = useAppSelector(inputSelector);
  const isFetching = useAppSelector(isFetchingSelector);
  const isLoading = useRef(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const setIsLoading = (state: boolean) => {
    isLoading.current = state;
  };
  const { page, pageEnd } = useInfinityScroll({
    isFetching,
    options: { threshold: 1 },
  });
  const handleFabClick = () => {
    navigate(PROJECT_MODIFYL_URL);
  };

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  useEffect(() => {
    const searchProjects = async (value: string) => {
      dispatch(setIsFetching(true));
      setIsEndOfList(true);
      try {
        const searchResult = await searchAll(value).then((result: unknown) =>
          parseSearchResult(result as Post[]),
        );
        dispatch(setSearchList(searchResult));
      } catch (error) {
        onGetFail(error);
      } finally {
        dispatch(setIsFetching(false));
      }
    };

    const value = headerSearchValue.trim();
    if (value.length < 1 || isLoading.current) {
      return;
    }

    const encoded = encodeURIComponent(value);

    searchProjects(encoded);
  }, [headerSearchValue, dispatch, onGetFail]);

  useEffect(() => {
    if (isLoading.current) return;

    const fetch = async () => {
      dispatch(setIsFetching(true));
      try {
        const res = await getChannelPosts(CHANNEL_ID.PROJECT, {
          offset: page * 5,
          limit: 5,
        });
        if (res.length === 0) setIsEndOfList(true);
        const data: ProjectType[] = parseProjectPosts(res);
        dispatch(setProjectList(data));
      } catch (error) {
        onGetFail(error);
      } finally {
        dispatch(setIsFetching(false));
      }
    };

    fetch();
  }, [page, dispatch, onGetFail]);

  useEffect(() => {
    return () => {
      dispatch(cleanProjectList());
    };
  }, [dispatch]);

  return {
    handleFabClick,
    projects: list,
    isLogin,
    target: pageEnd,
    isFetching,
    isEndOfList,
  };
};

export default useProjectList;

interface Post {
  channel: string;
  _id: string;
}

export const parseProjectPosts = (posts: PostType[]) => {
  return posts.map((post) => {
    const {
      _id,
      image,
      author: { fullName },
      title: content,
    } = post;
    const { title } = JSON.parse(content);
    return { _id, name: fullName, projectTitle: title, image };
  });
};

const parseSearchResult = async (result: Post[]) => {
  const filteredSet = new Set(
    result
      .filter((item) => item.channel === CHANNEL_ID.PROJECT)
      .map((list) => list._id),
  );
  const searchResult = await getChannelPosts(CHANNEL_ID.PROJECT, {})
    .then((list: PostType[]) =>
      list.filter((post) => filteredSet.has(post._id)),
    )
    .then((list) => parseProjectPosts(list));
  return searchResult;
};
