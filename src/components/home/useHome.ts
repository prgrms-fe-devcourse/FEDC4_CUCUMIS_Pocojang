import { useEffect, useState } from 'react';

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
  const { page, pageEnd } = useInfiniteScroll({ options: {} });

  useEffect(() => {
    Promise.all([
      getChannelPosts(CHANNEL_ID.PROJECT, {
        offset: page * 3,
        limit: 3,
      }),
      getChannelPosts(CHANNEL_ID.DEVELOPER, {
        offset: page * 4,
        limit: 4,
      }),
    ])
      .then((lists) => parseHomeList(...lists))
      .then((result) => setHomeList((state) => [...state, ...result]));
  }, [page]);

  return { homeList, target: pageEnd };
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
  projects[projects.length - 1] = {
    ...projects[projects.length - 1],
    developers,
  };

  return projects;
};
