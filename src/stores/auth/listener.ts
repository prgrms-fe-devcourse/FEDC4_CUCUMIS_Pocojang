import { Unsubscribe } from '@reduxjs/toolkit';

import { AppStartListening } from '@/stores';
import { setAuth } from '@/stores/auth';
import session from '@/utils/sessionStorage';
import SESSION_STORAGE from '@/consts/sessionStorage';

const onUpdateToken = ({ payload }: ReturnType<typeof setAuth>) => {
  const { token } = payload;

  session.setItem(SESSION_STORAGE.TOKEN, token);
};

export const setupAuthListeners = (
  startListening: AppStartListening,
): Unsubscribe => {
  const subscriptions = [
    startListening({
      actionCreator: setAuth,
      effect: onUpdateToken,
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
