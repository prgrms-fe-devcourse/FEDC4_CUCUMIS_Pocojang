import { HeaderType } from '@/types/components/Header';

export const getHeaderType = (
  location: string,
  userId: string,
  isLogin: boolean,
) => {
  const path = location.split('/').filter((path) => path);

  if (path.length === 0) {
    return HeaderType.LOGO;
  }
  if (path.length === 1) {
    if (path[0] === 'dm') {
      return HeaderType.LOGO;
    } else if (path[0] === 'projects' || path[0] === 'developers') {
      return HeaderType.SEARCH;
    }
  }
  if (path.length === 2) {
    if (path[0] === 'profile' && isLogin && path[1] === userId) {
      return HeaderType.LOGO;
    }
  }
  return HeaderType.BACK;
};

export const getTitle = (location: string) => {
  if (location === '/') return 'home';
  if (location === '/projects') return 'project';
  return location;
};
