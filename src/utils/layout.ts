import { HeaderType, Title } from '@/types/components/Header';

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
    if (path[0] === 'dm' || path[0] === 'profile') {
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

export const getTitle = (
  location: string,
  userId: string,
  isLogin: boolean,
  visitingUserName: string,
) => {
  const path = location.split('/').filter((path) => path);

  if (path.length === 0) {
    return Title.HOME;
  }
  if (path[0] === 'projects') {
    if (path[1] === 'write') {
      if (path.length === 2) {
        return Title.PROJECT_WRITE;
      } else if (path.length === 3) {
        return Title.PROJECT_UPDATE;
      }
    } else if (path.length === 2) {
      return Title.PROJECT;
    }
  }
  if (path[0] === 'developers' && path.length === 2) {
    return Title.DEVELOPER;
  }
  if (path[0] === 'dm') {
    if (path.length === 1) {
      return Title.DM;
    } else if (path.length === 2) {
      return visitingUserName;
    }
  }
  if (path[0] === 'profile') {
    if (path.length === 1) {
      return Title.PROFILE;
    }
    if (path.length === 2) {
      if (isLogin && path[1] === userId) {
        return Title.PROFILE;
      } else {
        return path[1]; // TODO: 프로필 유저 이름 가져오기
      }
    }
  }
  if (path[0] === 'settings' && path.length === 1) {
    return Title.SETTINGS;
  }
  if (path[0] === 'login' && path.length === 1) {
    return Title.LOGIN;
  }
  if (path[0] === 'signup' && path.length === 2) {
    if (path[1] === 'step1' || path[1] === 'step2') {
      return Title.SIGNUP;
    }
  }
  if (path[0] === 'notification' && path.length === 1) {
    return Title.NOTIFICATION;
  }
  return Title.NOT_FOUND;
};
