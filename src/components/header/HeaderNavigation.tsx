import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import img from '@/assets/Logo512.svg';

interface HeaderProps {
  start?: React.ReactElement;
  center?: React.ReactElement;
  end?: React.ReactElement;
}

interface PageProps {
  isLoggedIn?: boolean;
  pageName?: string;
  event?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const LogoImageComponent = <img src={img} width="30" />;

const LogoButtonComponent = (
  <Button color="inherit">{LogoImageComponent}</Button>
);

const LogoWithTitleButtonComponent = (
  <Button color="inherit" sx={{ width: '200px' }}>
    {LogoImageComponent}
    <span>참외인력소</span>
  </Button>
);

export const MainHeader = ({ isLoggedIn, event }: PageProps): HeaderProps => ({
  start: LogoWithTitleButtonComponent,
  end: isLoggedIn ? (
    <Button color="inherit" onClick={event}>
      알림
    </Button>
  ) : (
    <Button color="inherit" onClick={event}>
      종
    </Button>
  ),
});

export const BackButtonHeader = ({
  pageName,
  event,
}: PageProps): HeaderProps => ({
  start: (
    <Button color="inherit" onClick={event}>
      뒤
    </Button>
  ),
  center: <Typography variant="h6">{pageName}</Typography>,
});

export const SearchHeader = ({ event }: PageProps): HeaderProps => ({
  start: LogoButtonComponent,
  center: <input />,
  end: (
    <Button color="inherit" onClick={event}>
      돋보기
    </Button>
  ),
});

export const PageNavigator = ({
  isLoggedIn,
  pageName,
  event,
}: PageProps): Record<string, HeaderProps> => {
  const header = {
    Main: MainHeader({ isLoggedIn, event }),
    DeveloperList: SearchHeader({ event }),
    Alarm: BackButtonHeader({ pageName, event }),
  };

  return header;
};
