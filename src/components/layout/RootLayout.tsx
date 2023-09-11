import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import Header from '@/components/layout/HeaderLayout';
import Nav from '@/components/nav';
import { theme } from '@/styles/theme';
import { store } from '@/stores';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Outlet />
        <Nav />
      </ThemeProvider>
    </Provider>
  );
}
