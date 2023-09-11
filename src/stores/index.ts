import {
  configureStore,
  TypedStartListening,
  TypedAddListener,
  ListenerEffectAPI,
  addListener,
} from '@reduxjs/toolkit';

import { reducers } from '@/stores/reducers';
import { listenerMiddleware } from '@/stores/listenerMiddleware';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;
