import { useNavigate } from 'react-router-dom';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { DarkMode } from '@mui/icons-material';

import MainFab from '@/components/shared/mainFab';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/api/auth';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { removeAuthData } = useAuth();

  const toggleDark = () => {
    console.log('dark toggled!');
  };

  const fetchLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      removeAuthData();
    }
  };

  const handleClickProfileSetting = () => {
    navigate('/settings/profile');
  };
  const handleClickPasswordSetting = () => {
    navigate('/settings/password');
  };
  const handleClickLogout = () => {
    fetchLogout();
    navigate('/');
  };

  return (
    <Stack>
      <List component="div">
        <ListItemButton onClick={handleClickProfileSetting}>
          <ListItemText primary="프로필 수정" />
        </ListItemButton>
        <ListItemButton onClick={handleClickPasswordSetting}>
          <ListItemText primary="비밀번호 수정" />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={handleClickLogout}>
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
      <MainFab bottom={20} onClick={toggleDark}>
        <DarkMode />
      </MainFab>
    </Stack>
  );
}
