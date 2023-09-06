import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import useHeader from '@/components/header/useHeader';

export default function Header() {
  const { header } = useHeader();

  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      <AppBar>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Box id="start-box">{header.start}</Box>

          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>{header.center}</Box>

          <Box id="end-box">{header.end}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
