import { useEffect, useState } from 'react';
import axios from 'axios';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';
import { PostType } from '@/types';
import { getChannelPosts } from '@/api/posts';

const PROJECT_CHANNEL_ID = '6503eaffa14c752383b6a8b8';
const DEVELOPER_CHANNEL_ID = '650557d36a9d603a4d150e7d';

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
// TODO 동시 호출api 로 빼주기  온라인은 개발자리스트로 바꾸고 , 순수함수로 변환,홈페이지 리스를 여기서 파싱해서 만들어줘야된다.타입은 import 해오기 ,최대길이 예외처리
const useHome = () => {
  const [homeList, setHomeList] = useState<HomeType[]>([]);
  useEffect(() => {
    axios
      .all([
        getChannelPosts(PROJECT_CHANNEL_ID, { offset: 0, limit: 3 }),
        getChannelPosts(DEVELOPER_CHANNEL_ID, { offset: 0, limit: 4 }),
      ])
      .then(
        axios.spread((projectList, developerList) => {
          return parseHomeList(projectList, developerList);
        }),
      )
      .then((list) => setHomeList(list));
  }, []);

  //각각 호출해서

  return { homeList };
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
    } = developerPost; // 여기는 개발자채널의 post id이다. 아바타 클릭시 어디로 이동?

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

/**
 * interface DeveloperType {
  _id: string;
  name: string;
  AvatarProps: BasicAvatarProps;
}

interface HomeType {
  _id: string;
  imageUrl?: string;
  name: string;
  projectTitle: string;
  de
  developers?: DeveloperType[];
}
 */
