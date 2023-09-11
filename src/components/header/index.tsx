import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setInput, headerTypeSelector, titleSelector } from '@/stores/layout';
import { isLoginSelector } from '@/stores/auth';
import { HeaderType, Title } from '@/types/components/Header';
import BasicChip from '@/components/shared/chip';
import BasicSearch from '@/components/shared/search';
import BasicIconButton from '@/components/shared/iconButton';

const Header = () => {
  const navigate = useNavigate();
  const inputStringRef = useRef('');
  const dispatch = useAppDispatch();
  const headerType = useAppSelector(headerTypeSelector);
  const title = useAppSelector(titleSelector);
  const isLogin = useAppSelector(isLoginSelector);

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setInput(inputStringRef.current.search));
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const logout = () => {
    // TODO: 로그아웃
  };

  return (
    <AppBarStyled position="fixed" elevation={0}>
      <ToolbarStyled>
        {headerType === HeaderType.LOGO && (
          <>
            <LinkStyled to="/">
              <img src="/assets/Logo512.png" alt="CUCUMIS" width={40} />
            </LinkStyled>
            <TypographyStyled variant="h6" component="h1" color="primary">
              {title}
            </TypographyStyled>
            {isLogin ? (
              <Link to="/notification">
                <NotificationsIcon color="primary" />
              </Link>
            ) : (
              <BasicChip
                label="로그인"
                variant="outlined"
                color="primary"
                onClick={goToLogin}
              />
            )}
          </>
        )}
        {headerType === HeaderType.SEARCH && (
          <>
            <LinkStyled to="/">
              <img src="/assets/Logo512.png" alt="CUCUMIS" width={40} />
            </LinkStyled>
            <FormStyled onSubmit={handleFormSubmit}>
              <BasicSearch inputRef={inputStringRef} />
              <BasicIconButton type="submit">
                <SearchIcon />
              </BasicIconButton>
            </FormStyled>
          </>
        )}
        {headerType === HeaderType.BACK && (
          <>
            <BasicIconButton onClick={goBack}>
              <ArrowBackIosNewIcon />
            </BasicIconButton>
            <TypographyStyled
              variant="h6"
              component="h1"
              color="primary"
              align="center"
            >
              {title}
            </TypographyStyled>
            {title === Title.SETTINGS && isLogin && (
              <BasicChip
                label="로그아웃"
                variant="outlined"
                color="primary"
                onClick={logout}
              />
            )}
          </>
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

const LinkStyled = styled(Link)`
  display: flex;
  padding-right: 12px;
`;

const AppBarStyled = styled(AppBar)`
  max-width: 600px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
`;

const ToolbarStyled = styled(Toolbar)({
  paddingRight: '8px',
  paddingLeft: '8px',
});

const TypographyStyled = styled(Typography)<{ align: string }>(({ align }) => ({
  flexGrow: 1,
  textAlign: align,
  paddingRight: 40,
})) as typeof Typography;

const FormStyled = styled('form')({
  display: 'flex',
  width: '100%',
});

export default Header;
