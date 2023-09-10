import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '@/components/layout/HeaderLayout';
import Navbar from '@/components/navbar';
import { theme } from '@/styles/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Outlet />
      <Navbar />
    </ThemeProvider>
  );
}
