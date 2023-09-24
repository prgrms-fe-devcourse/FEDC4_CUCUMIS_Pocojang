import { useRef, useEffect, useState } from 'react';

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

interface useHomeProps {
  onGetFail: (error: unknown) => void;
}

const useHome = ({ onGetFail }: useHomeProps) => {
  const [homeList, setHomeList] = useState<HomeType[]>([]);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const isLoading = useRef(false);
  const setIsLoading = (state: boolean) => {
    isLoading.current = state;
  };
  const { page, pageEnd } = useInfiniteScroll({ isFetching, options: {} });

  useEffect(() => {
    setIsLoading(isFetching);
    onGetFail('hi');
  }, [isFetching, onGetFail]);

  useEffect(() => {
    if (isLoading.current) return;

    const fetch = async () => {
      setIsFetching(true);
      const result = await Promise.all([
        getChannelPosts(CHANNEL_ID.PROJECT, {
          offset: page * 3,
          limit: 3,
        }),
        getChannelPosts(CHANNEL_ID.DEVELOPER, {
          offset: page * 4,
          limit: 4,
        }),
      ]).then((lists) => parseHomeList(...lists));
      if (result.length === 0) setIsEndOfList(true);
      setHomeList((state) => [...state, ...result]);
      setIsFetching(false);
    };

    fetch();
  }, [page]);

  return { homeList, target: pageEnd, isFetching, isEndOfList };
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
    developers: developers.length === 0 ? undefined : developers,
  };

  return projects;
};
