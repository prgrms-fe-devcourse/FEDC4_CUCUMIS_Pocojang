import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';
import { PostType } from '@/types';
import { getChannelPosts } from '@/api/posts';
import CHANNEL_ID from '@/consts/channels';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface DeveloperType {
  _id: string;
  label: string;
  AvatarProps: BasicAvatarProps;
}

interface HomeType {
  _id: string;
  imageUrl?: string;
  name: string;
  projectTitle: string;
  developers?: DeveloperType[];
}
// TODO최대길이 예외처리, api 예외처리
const useHome = () => {
  const [homeList, setHomeList] = useState<HomeType[]>([]);
  const target = useRef<HTMLDivElement>(null);
  const { page } = useInfiniteScroll({ target, endPoint: 2, options: {} });

  useEffect(() => {
    axios
      .all([
        getChannelPosts(CHANNEL_ID.PROJECT, {
          offset: 0,
          limit: 3 * page,
        }),
        getChannelPosts(CHANNEL_ID.DEVELOPER, {
          offset: 0,
          limit: 4 * page,
        }),
      ])
      .then(
        axios.spread((projectList, developerList) => {
          return parseHomeList(projectList, developerList);
        }),
      )
      .then((list) => setHomeList(list));
  }, [page]);

  return { homeList, target };
};
export default useHome;

const parseProjectPosts = (list: PostType[]) => {
  return list.map((projectPost) => {
    const { _id, title, author, image } = projectPost;
    const { title: projectTitle } = JSON.parse(title);

    return { _id, projectTitle, name: author.fullName, imageUrl: image };
  });
};

const parseDeveloperPosts = (list: PostType[]) => {
  return list.map((developerPost) => {
    const {
      _id,
      author: { fullName, image, isOnline },
    } = developerPost;
    return {
      _id,
      label: fullName,
      AvatarProps: { imgSrc: image, alt: fullName, isUserOn: isOnline },
    };
  });
};

const parseHomeList = (projectList: PostType[], developerList: PostType[]) => {
  const projects: HomeType[] = parseProjectPosts(projectList);
  const developers: DeveloperType[] = parseDeveloperPosts(developerList);
  let page = 0;
  return projects.map((project, index) => {
    if ((index + 1) % 3 === 0) {
      const sliced = developers.slice(page, page + 4);
      page++;
      return { ...project, developers: sliced };
    } else return project;
  });
};
