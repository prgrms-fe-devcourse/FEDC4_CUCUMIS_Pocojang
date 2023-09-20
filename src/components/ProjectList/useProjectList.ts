import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';

import { setList } from '@/stores/projects';
import useInfinityScroll from '@/hooks/useInfiniteScroll';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { projectsSelector } from '@/stores/projects/selector';
import { isLoginSelector } from '@/stores/auth';
import { PostType } from '@/types';
import { getChannelPosts } from '@/api/posts';
import { inputSelector } from '@/stores/layout';
import { searchAll } from '@/api/search';
import CHANNEL_ID from '@/consts/channels';
export interface ProjectType {
  _id: string;
  image?: string;
  name: string;
  projectTitle: string;
}

// TODO JSON.parse 에러처리, 무한스크롤 최적화, 검색 후 무한 스크롤, 채널 포스트를 초기에 가져와서 id 필터
const useProjectList = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector(isLoginSelector);
  const list = useAppSelector(projectsSelector);
  const dispatch = useAppDispatch();
  const headerSearchValue = useAppSelector(inputSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { page, pageEnd } = useInfinityScroll({ options: { threshold: 1 } });

  const handleFabClick = () => {
    navigate('/projects/write');
  };

  useEffect(() => {
    const searchProjects = async (value: string) => {
      const searchResult = await searchAll(value).then((result: unknown) =>
        parseSearchResult2(result as Post[]),
      );
      dispatch(setList(searchResult));
      setIsLoading(false);
    };

    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    setIsLoading(true);
    console.log(value);
    const encoded = encodeURIComponent(value);
    searchProjects(encoded);
  }, [headerSearchValue, dispatch]);

  const fetchProjects = useCallback(
    async (page: number) => {
      const res = await getChannelPosts(CHANNEL_ID.PROJECT, {
        offset: page * 5,
        limit: 5,
      });
      const data: ProjectType[] = parseProjectList(res);
      dispatch(setList(data));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);

  return {
    handleFabClick,
    projects: list,
    isLogin,
    target: pageEnd,
    isLoading,
  };
};

export default useProjectList;

interface Post {
  channel: string;
  _id: string;
}
const parseProject = (project: PostType) => {
  const {
    _id,
    image,
    author: { fullName },
    title: content,
  } = project;
  const { title } = JSON.parse(content);
  return { _id, name: fullName, projectTitle: title, image };
};

const parseProjectList = (list: PostType[]) => {
  return list.map(parseProject);
};

// const parseSearchResult = async (result: Post[]) => {
//   const filtered = result
//     .filter((item) => item.channel === CHANNEL_ID.PROJECT)
//     .map((item) => getPost(item._id));
//   const projectList = await Promise.all(filtered).then((res) =>
//     res.map(parseProject),
//   );
//   return projectList;
// };

const parseSearchResult2 = async (result: Post[]) => {
  const filteredSet = new Set(
    result
      .filter((item) => item.channel === CHANNEL_ID.PROJECT)
      .map((list) => list._id),
  );
  const searchResult = await getChannelPosts(CHANNEL_ID.PROJECT, {})
    .then((list: PostType[]) =>
      list.filter((post) => filteredSet.has(post._id)),
    )
    .then((list) => list.map((post) => parseProject(post)));
  return searchResult;
};
