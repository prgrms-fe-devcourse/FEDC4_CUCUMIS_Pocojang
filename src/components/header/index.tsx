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
import useForm from '@/hooks/useForm';
import BasicChip from '@/components/shared/chip';
import BasicSearch from '@/components/shared/search';
import BasicIconButton from '@/components/shared/iconButton';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const headerType = useAppSelector(headerTypeSelector);
  const title = useAppSelector(titleSelector);
  const isLogin = useAppSelector(isLoginSelector);
  const { handleChange, handleSubmit } = useForm({
    initialValues: { search: '' },
    onSubmit: ({ search }) => {
      dispatch(setInput(search));
    },
    validate: ({ search }) => {
      const newErrors = { search: '' };
      if (!search) newErrors.search = '검색어를 입력해주세요.';
      return newErrors;
    },
  });

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
            <FormStyled onSubmit={handleSubmit}>
              <BasicSearch
                onChange={handleChange}
                placeholder="검색어를 입력해주세요"
              />
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
              paddingRight={title === Title.SETTINGS && isLogin ? 0 : 40}
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

const AppBarStyled = styled(AppBar)({
  maxWidth: '600px',
  left: 0,
  right: 0,
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.04)',
});

const ToolbarStyled = styled(Toolbar)({
  paddingRight: '8px',
  paddingLeft: '8px',
});

const LinkStyled = styled(Link)`
  display: flex;
  padding-right: 12px;
`;

const TypographyStyled = styled(Typography)<{
  align: string;
  paddingRight: number;
}>(({ align, paddingRight }) => ({
  flexGrow: 1,
  textAlign: align,
  paddingRight: `${paddingRight}px`,
})) as typeof Typography;

const FormStyled = styled('form')({
  display: 'flex',
  width: '100%',
});

export default Header;
