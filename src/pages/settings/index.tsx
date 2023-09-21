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

export default function SettingsPage() {
  const navigate = useNavigate();

  const toggleDark = () => {
    console.log('dark toggled!');
  };

  const handleClickProfileSetting = () => {
    navigate('/settings/profile');
  };
  const handleClickPasswordSetting = () => {
    navigate('/settings/password');
  };
  const handleClickLogout = () => {
    // TODO: logout API 함수 호출 및 세션 초기화
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
