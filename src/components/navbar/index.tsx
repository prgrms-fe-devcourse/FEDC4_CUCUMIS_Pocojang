import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LaptopIcon from '@mui/icons-material/Laptop';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAppSelector } from '@/stores/hooks';
import { locationSelector } from '@/stores/layout/selector';

const Navbar = () => {
  const location = useAppSelector(locationSelector);

  const navigations = [
    { name: '프로젝트', path: '/projects', icon: <LaptopIcon /> },
    { name: '개발자', path: '/developers', icon: <PeopleIcon /> },
    { name: '홈', path: '/', icon: <HomeIcon /> },
    { name: 'DM', path: '/dm', icon: <EmailIcon /> },
    { name: '프로필', path: '/profile/1', icon: <AccountCircleIcon /> }, // TODO: /profile/${userId}로 변경하기
  ];

  return (
    navigations.some((nav) => nav.path === location) && (
      <PaperStyled elevation={1} component="nav">
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
    )
  );
};

const PaperStyled = styled(Paper)`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
`;

export default Navbar;
