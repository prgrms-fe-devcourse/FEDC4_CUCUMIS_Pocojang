import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LaptopIcon from '@mui/icons-material/Laptop';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useNavbar from '@/components/navbar/useNavbar';

export default function Navbar() {
  const { value, handleChange } = useNavbar({
    initialValue: 'home',
  });

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, width: 600 }}
      elevation={1}
      component={'nav'}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          component={Link}
          to="/projects"
          value="projects"
          label="프로젝트"
          icon={<LaptopIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/developers"
          value="developers"
          label="개발자"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          value="home"
          label="홈"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/dm"
          value="dm"
          label="DM"
          icon={<EmailIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/profile/1"
          value="profile"
          label="프로필"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
