import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '@/components/layout/HeaderLayout';
import Nav from '@/components/nav';
import { theme } from '@/styles/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Outlet />
        <Nav />
      </div>
    </ThemeProvider>
  );
}
