import { Unsubscribe } from '@reduxjs/toolkit';

import { AppStartListening } from '@/stores';
import { setAuth } from '@/stores/auth';

const onUpdateToken = ({ payload }: ReturnType<typeof setAuth>) => {
  const { token } = payload;
  if (!token) return;

  // TODO: session storage 에 token 저장
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
