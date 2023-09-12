import { Unsubscribe } from '@reduxjs/toolkit';

import { AppStartListening } from '@/stores';
import { setAuth, setUser } from '@/stores/auth';
import session from '@/utils/sessionStorage';
import SESSION_STORAGE from '@/consts/sessionStorage';

const onUpdateToken = ({ payload: token }: ReturnType<typeof setAuth>) => {
  session.setItem(SESSION_STORAGE.TOKEN, token);
};

const onUpdateUser = ({ payload: user }: ReturnType<typeof setUser>) => {
  session.setItem(SESSION_STORAGE.USER, user);
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
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
