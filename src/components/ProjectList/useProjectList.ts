import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { setList } from '@/stores/projects';
import useInfinityScroll from '@/hooks/useInfiniteScroll';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { projectsSelector } from '@/stores/projects/selector';
import { isLoginSelector } from '@/stores/auth';
import { PostType } from '@/types';
import { getChannelPosts } from '@/api/posts';
import { inputSelector } from '@/stores/layout';

export interface ProjectType {
  _id: string;
  image?: string;
  name: string;
  projectTitle: string;
}
const CHANNEL_ID = '6503eaffa14c752383b6a8b8';

// TODO JSON.parse 에러처리, 무한스크롤 최적화, 검색,
const useProjectList = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector(isLoginSelector);
  const target = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const list = useAppSelector(projectsSelector);
  const headerSearchValue = useAppSelector(inputSelector);

  const { page } = useInfinityScroll({
    target,
    endPoint: 4,
    options: { threshold: 0.5 },
    list,
  });

  const handleFabClick = () => {
    navigate('/projects/write');
  };

  useEffect(() => {
    const value = headerSearchValue.trim();
    if (value.length < 1) return;
    //TODO 검색 기능
  }, [headerSearchValue]);

  useEffect(() => {
    // 두번호출떄문에 새로 업데이트
    getChannelPosts(CHANNEL_ID, { offset: 0, limit: page * 5 + 5 })
      .then((list) => parseProjectList(list))
      .then((projects) => {
        dispatch(setList(projects));
      });
  }, [page, dispatch]);

  return {
    handleFabClick,
    projects: list,
    isLogin,
    target,
  };
};

export default useProjectList;

const parseProjectList = (list: PostType[]) => {
  return list.map((project) => {
    const {
      _id,
      image,
      author: { fullName },
      title: content,
    } = project;
    const { title } = JSON.parse(content);
    return { _id, name: fullName, projectTitle: title, image };
  });
};
