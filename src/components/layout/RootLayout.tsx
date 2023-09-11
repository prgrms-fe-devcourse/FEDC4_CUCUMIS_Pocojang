import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { setLocation, setInput } from '@/stores/layout';
import { useAppDispatch } from '@/stores/hooks';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLocation({ nextLocation: location.pathname }));
    dispatch(setInput(''));
  }, [dispatch, location]);

  return (
    <>
      <Header />
      <Outlet />
      <Navbar />
    </>
  );
}
