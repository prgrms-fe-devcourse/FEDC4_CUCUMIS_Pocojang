import { HeaderType } from '@/types/components/Header';

export const getHeaderType = (
  location: string,
  userId: string,
  isLogin: boolean,
) => {
  console.log(location, userId, isLogin);
  return HeaderType.LOGO;
};

export const getTitle = (location: string) => {
  if (location === '/') return 'home';
  if (location === '/projects') return 'project';
  return location;
};
