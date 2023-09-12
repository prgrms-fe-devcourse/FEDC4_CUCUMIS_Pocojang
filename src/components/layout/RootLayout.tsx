import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

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
      <MainStyled component="main">
        <Outlet />
      </MainStyled>
      <Navbar />
    </>
  );
}

const MainStyled = styled(Box)({
  minHeight: 'calc(100vh - 120px)',
  padding: '64px 16px 56px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.08)',
});
