import { Box, Stack } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

import cucumisLogo from '@/assets/logo/cucumis-logo.svg';
import BasicButton from '@/components/shared/button';

interface Props {
  formId?: string;
  children: ReactNode;
  buttonText: string;
  onSubmit: () => void;
}

const SignupInputContainer = ({
  formId = 'signupForm',
  children,
  buttonText,
  onSubmit,
}: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Stack alignItems="center" sx={{ px: '16px' }}>
      <Box>
        <img src={cucumisLogo} alt="Cucumis Logo" />
      </Box>
      <Stack
        component="form"
        id={formId}
        width={1}
        spacing={2}
        onSubmit={handleSubmit}
      >
        {children}
      </Stack>
      <BasicButton type="submit" form={formId} sx={{ mt: 5 }}>
        {buttonText}
      </BasicButton>
    </Stack>
  );
};

export default SignupInputContainer;
