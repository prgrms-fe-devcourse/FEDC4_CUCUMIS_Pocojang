import { Outlet } from 'react-router-dom';

import Header from '@/layout/HeaderLayout';
import Nav from '@/components/nav';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Nav />
    </div>
  );
}
