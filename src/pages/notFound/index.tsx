import styled from '@emotion/styled';
import { Box, Checkbox, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';

export default function NotFoundPage() {
  const error = useRouteError();

  return (
    <BoxStyled>
      <CheckboxStyled
        disableRipple
        icon={<img src="/assets/Crying-Logo1.png" alt="" />}
        checkedIcon={<img src="/assets/Crying-Logo2.png" alt="" />}
      />
      <TitleStyled variant="h6" component="h2">
        404 Not Found
      </TitleStyled>
      <TypographyStyled variant="body2" component="p" color="gray">
        {error instanceof AxiosError
          ? error.message
          : '페이지를 찾을 수 없습니다'}
      </TypographyStyled>
    </BoxStyled>
  );
}

const BoxStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 120px)',
});

const CheckboxStyled = styled(Checkbox)({
  width: '100%',
  '& > img': {
    maxWidth: '320px',
  },
});

const TypographyStyled = styled(Typography)({
  textAlign: 'center',
}) as typeof Typography;

const TitleStyled = styled(TypographyStyled)({
  fontSize: '24px',
}) as typeof TypographyStyled;
