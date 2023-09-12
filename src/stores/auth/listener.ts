import { Unsubscribe } from '@reduxjs/toolkit';

import { AppStartListening } from '@/stores';
import { setAuth, setUser } from '@/stores/auth';
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
