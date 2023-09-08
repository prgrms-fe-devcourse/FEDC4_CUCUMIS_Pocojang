import { Unsubscribe } from '@reduxjs/toolkit';

import { AppListenerEffectAPI, AppStartListening } from '@/stores';
import { setAuth, setIsLogin } from '@/stores/auth';

const onUpdateToken = (
  { payload }: ReturnType<typeof setAuth>,
  { dispatch }: AppListenerEffectAPI,
) => {
  const { token } = payload;
  if (token) console.log('token middleware start');

  dispatch(setIsLogin(true));
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
