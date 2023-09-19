import { Button, Box, Stack } from '@mui/material';
import styled from '@emotion/styled';

import usePost from '@/components/projects/usePost';
import BasicInput from '@/components/shared/input';
import BasicButton from '@/components/shared/button';

export default function ProjectPost() {
  const { title } = usePost();

  return (
    <FormBox>
      <Stack spacing={3}>
        <Box />
        {title ? (
          <PreviewImageBox src={''} alt="프로필 이미지" />
        ) : (
          <UploadStyledButton variant="outlined" component="label">
            <Box>Click to Upload</Box>
            <input hidden accept="image/*" multiple type="file" />
          </UploadStyledButton>
        )}
        <BasicInput defaultValue={title} label="title" type="multiline" />
        <BasicInput label="requirements" type="multiline" />
      </Stack>
      <BasicButtonStyled type="submit">제출하기</BasicButtonStyled>
    </FormBox>
  );
}

const UploadStyledButton = styled(Button)({
  border: '1px dotted #c8c7c7',
  width: '100%',
  height: '20vh',
}) as typeof Button;

const BasicButtonStyled = styled(BasicButton)({
  height: '56px',
  boxSizing: 'border-box',
});

const FormBox = styled('form')({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '10vh',
});

const PreviewImageBox = styled('img')({
  border: '1px dotted #c8c7c7',
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});
