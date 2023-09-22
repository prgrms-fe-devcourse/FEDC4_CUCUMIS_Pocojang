import { Stack } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

import BasicButton from '@/components/shared/button';

interface Props {
  formId?: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SettingsInputContainer = ({
  formId = 'settingsForm',
  children,
  onSubmit,
}: Props) => {
  return (
    <Stack
      alignItems="center"
      sx={{
        minHeight: 'calc(100vh - 120px)',
        justifyContent: 'space-between',
        py: 3,
      }}
    >
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
        수정하기
      </BasicButton>
    </Stack>
  );
};

export default SettingsInputContainer;
