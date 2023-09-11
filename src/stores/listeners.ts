import { Unsubscribe } from '@reduxjs/toolkit';

import { startAppListening } from '@/stores';
import { setupAuthListeners } from '@/stores/auth/listener';

const listeners = [setupAuthListeners];

export const setupListeners = (): Unsubscribe[] => {
  return listeners.map((setupListener) => setupListener(startAppListening));
};
