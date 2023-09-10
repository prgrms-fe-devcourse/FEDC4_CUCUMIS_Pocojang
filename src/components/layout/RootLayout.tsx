import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '@/components/layout/HeaderLayout';
import Navbar from '@/components/navbar';
import { theme } from '@/styles/theme';
import { setLocation } from '@/stores/layout';
import { useAppDispatch } from '@/stores/hooks';

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLocation({ nextLocation: location.pathname }));
  }, [dispatch, location]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Outlet />
      <Navbar />
    </ThemeProvider>
  );
}
