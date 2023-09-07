import {
  Action,
  ActionCreatorWithPayload,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

import { listeners } from '@/stores/listeners';

export const listenerMiddleware = createListenerMiddleware();

listeners.forEach((listener: Listener) => {
  listenerMiddleware.startListening(listener);
});

export interface Listener {
  actionCreator: ActionCreatorWithPayload<unknown, string>;
  effect: (action: Action<unknown>, listenerApi: unknown) => void;
}
