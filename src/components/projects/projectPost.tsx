import { Button, Box, Stack } from '@mui/material';
import styled from '@emotion/styled';

import usePost from '@/components/projects/usePost';
import BasicInput from '@/components/shared/input';

export default function ProjectPost() {
  const { title, contents } = usePost();

  return (
    <Stack spacing={3}>
      <Box />
      <UploadStyledButton variant="outlined" component="label">
        <Box>Click to Upload</Box>
        <input hidden accept="image/*" multiple type="file" />
      </UploadStyledButton>
      <BasicInput defaultValue={title} label="title" />
      <BasicInput defaultValue={contents} label="contents" type="multiline" />
    </Stack>
  );
}

const UploadStyledButton = styled(Button)({
  border: '1px dotted #c8c7c7',
  width: '100%',
  height: '20vh',
}) as typeof Button;
