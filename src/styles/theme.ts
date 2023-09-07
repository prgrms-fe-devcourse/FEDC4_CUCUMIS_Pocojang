import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFBE1E',
      light: '#FFD685',
      dark: '#FFA100',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8EBF16',
      light: '#A5CC45',
      dark: '#7DA813',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Pretendard', sans-serif",
  },
});
