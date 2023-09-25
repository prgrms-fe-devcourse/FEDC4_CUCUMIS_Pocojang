import { Unsubscribe } from '@reduxjs/toolkit';

import { AppStartListening } from '@/stores';
import { removeAuth, removeUser, setAuth, setUser } from '@/stores/auth';
import session from '@/utils/sessionStorage';
import SESSION_STORAGE from '@/consts/sessionStorage';

const onUpdateToken = (action: ReturnType<typeof setAuth>) => {
  const token = action.payload;
  session.setItem(SESSION_STORAGE.TOKEN, token);
};

const onUpdateUser = (action: ReturnType<typeof setUser>) => {
  const user = action.payload;
  session.setItem(SESSION_STORAGE.USER, user);
};

const onRemoveAuth = () => {
  session.removeItem(SESSION_STORAGE.TOKEN);
};

const onRemoveUser = () => {
  session.removeItem(SESSION_STORAGE.USER);
};

export const setupAuthListeners = (
  startListening: AppStartListening,
): Unsubscribe => {
  const subscriptions = [
    startListening({
      actionCreator: setAuth,
      effect: onUpdateToken,
    }),
    startListening({
      actionCreator: setUser,
      effect: onUpdateUser,
    }),
    startListening({
      actionCreator: removeAuth,
      effect: onRemoveAuth,
    }),
    startListening({
      actionCreator: removeUser,
      effect: onRemoveUser,
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
