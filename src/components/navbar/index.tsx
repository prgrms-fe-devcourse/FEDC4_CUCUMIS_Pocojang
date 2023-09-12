import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LaptopIcon from '@mui/icons-material/Laptop';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setInput, locationSelector } from '@/stores/layout';
import { userIdSelector } from '@/stores/auth';
import BasicSearch from '@/components/shared/search';
import BasicIconButton from '@/components/shared/iconButton';

const Navbar = () => {
  const inputStringRef = useRef('');
  const dispatch = useAppDispatch();
  const location = useAppSelector(locationSelector);
  const userId = useAppSelector(userIdSelector);
  const path = useAppSelector(locationSelector)
    .split('/')
    .filter((path) => path);

  const navigations = [
    { name: '프로젝트', path: '/projects', icon: <LaptopIcon /> },
    { name: '개발자', path: '/developers', icon: <PeopleIcon /> },
    { name: '홈', path: '/', icon: <HomeIcon /> },
    { name: 'DM', path: '/dm', icon: <EmailIcon /> },
    { name: '프로필', path: `/profile/${userId}`, icon: <AccountCircleIcon /> },
  ];

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setInput(inputStringRef.current.search));
  };

  return navigations.some((nav) => nav.path === location) ? (
    <PaperStyled elevation={0} component="nav">
      <BottomNavigation showLabels value={location}>
        {navigations.map((nav) => (
          <BottomNavigationAction
            component={Link}
            to={nav.path}
            value={nav.path}
            label={nav.name}
            icon={nav.icon}
            key={nav.name}
          />
        ))}
      </BottomNavigation>
    </PaperStyled>
  ) : (
    path.length === 2 &&
      (path[0] === 'developers' ||
        path[0] === 'projects' ||
        path[0] === 'dm') && (
        <PaperStyled elevation={0}>
          <FormStyled onSubmit={handleFormSubmit}>
            <BasicSearch
              inputRef={inputStringRef}
              placeholder="내용을 입력해주세요"
            />
            <BasicIconButton type="submit">
              <SendIcon />
            </BasicIconButton>
          </FormStyled>
        </PaperStyled>
      )
  );
};

const PaperStyled = styled(Paper)({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  maxWidth: '600px',
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
}) as typeof Paper;

const FormStyled = styled('form')({
  display: 'flex',
  padding: '4px 16px',
});

export default Navbar;
