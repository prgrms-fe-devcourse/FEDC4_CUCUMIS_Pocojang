import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import type { Unsubscribe } from '@reduxjs/toolkit';

import { store } from '@/stores';
import { setupListeners } from '@/stores/listeners';

import { router } from './routes/appRouter';

export default function App() {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = setupListeners();
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
