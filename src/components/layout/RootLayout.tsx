import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/HeaderLayout';
import Nav from '@/components/nav';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Nav />
    </>
  );
}
