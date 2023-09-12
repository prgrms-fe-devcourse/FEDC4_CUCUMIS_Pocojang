import { Box, Stack } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

import cucumisLogo from '@/assets/logo/cucumis-logo.svg';
import BasicButton from '@/components/shared/button';

interface Props {
  formId?: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClick: () => void;
}

const LoginInputContainer = ({
  formId = 'loginForm',
  children,
  onSubmit,
  onClick,
}: Props) => {
  return (
    <Stack alignItems="center">
      <Box>
        <img src={cucumisLogo} alt="Cucumis Logo" />
      </Box>
      <Stack
        component="form"
        id={formId}
        width={1}
        spacing={2}
        onSubmit={onSubmit}
      >
        {children}
      </Stack>
      <BasicButton type="submit" form={formId} sx={{ mt: 5 }}>
        로그인
      </BasicButton>
      <BasicButton
        type="button"
        color="secondary"
        onClick={onClick}
        sx={{ mt: 1 }}
      >
        회원가입
      </BasicButton>
    </Stack>
  );
};

export default LoginInputContainer;
