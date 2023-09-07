import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { reducers } from '@/stores/reducers';
import { listenerMiddleware } from '@/stores/listenerMiddleware';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
