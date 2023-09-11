import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import type { Unsubscribe } from '@reduxjs/toolkit';

import { store } from '@/stores';
import { theme } from '@/styles/theme';
import { router } from '@/routes';
import { setupListeners } from '@/stores/listeners';

export default function App() {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = setupListeners();
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}
