import { Outlet } from 'react-router-dom';

import Header from '@/components/header/header';
import Nav from '@/components/nav/nav';

// import React from 'react'

export default function MainPage() {
  return (
    <div>
      <Header />
      <Outlet />
      <Nav />
    </div>
  );
}
