import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import useInfinityScroll from '@/hooks/useInfiniteScroll';
import { getChannelPosts } from '@/api/posts/channel/channelId';
import { useAppSelector } from '@/stores/hooks';
import { isLoginSelector } from '@/stores/auth';
import { PostType } from '@/types';

export interface ProjectType {
  _id: string;
  imageUrl?: string;
  name: string;
  projectTitle: string;
}
const CHANNEL_ID = '6503eaffa14c752383b6a8b8';

// TODO JSON.parse 에러처리, 무한스크롤 최적화, 이미지 받기, 새로고침에 저장 하기, 검색
const useProjectList = () => {
  const [list, setList] = useState<ProjectType[]>([]);
  const navigate = useNavigate();
  const isLogin = useAppSelector(isLoginSelector);
  const target = useRef<HTMLDivElement>(null);

  const { page } = useInfinityScroll({
    target,
    endPoint: 2,
    options: { threshold: 0.5 },
    list,
  });

  const handleFabClick = () => {
    navigate('/projects/write');
  };
  useEffect(() => {
    // 두번호출떄문에 새로 업데이트
    getChannelPosts({ offset: 0, limit: page * 5 + 5 }, CHANNEL_ID)
      .then((list) => parseProjectList(list))
      .then((projects) => {
        setList([...projects]);
      });
  }, [page]);

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
      author: { fullName },
      title: content,
    } = project;
    const { title } = JSON.parse(content);
    return { _id, name: fullName, projectTitle: title };
  });
};
