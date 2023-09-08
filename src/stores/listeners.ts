import { Unsubscribe } from '@reduxjs/toolkit';

import { startAppListening } from '@/stores';
import { setupAuthListeners } from '@/stores/auth/listener';
import { setupLayoutListeners } from '@/stores/layout/listener';

const listeners = [setupAuthListeners, setupLayoutListeners];

export const setupListeners = (): Unsubscribe[] => {
  return listeners.map((setupListener) => setupListener(startAppListening));
};
