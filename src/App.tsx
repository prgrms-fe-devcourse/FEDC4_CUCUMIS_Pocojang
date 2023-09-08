import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import type { Unsubscribe } from '@reduxjs/toolkit';

import { setupListeners } from '@/stores/listeners';

import { router } from './routes/appRouter';

export default function App() {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = setupListeners();
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
