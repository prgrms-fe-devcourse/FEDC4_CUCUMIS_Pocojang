import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material';
import styled from '@emotion/styled';

import usePost from '@/components/projects/usePost';
import BasicInput from '@/components/shared/input';
import BasicButton from '@/components/shared/button';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { createPost, updatePost } from '@/api/posts';
import CHANNEL_ID from '@/consts/channels';

export default function ProjectPost() {
  const navigate = useNavigate();

  const {
    projectId,
    prevTitle,
    prevRequirements,
    isLoading,
    handleFileChange,
    selectedFile,
    imageFile,
  } = usePost();

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      requirements: '',
    },
    onSubmit: async ({ title, requirements }) => {
      const formatedTitle = JSON.stringify({
        title: title || prevTitle,
        requirements: requirements || prevRequirements,
      });

      const formData = new FormData();
      formData.append('title', formatedTitle);
      formData.append('channelId', CHANNEL_ID.PROJECT);

      selectedFile && formData.append('image', selectedFile);

      try {
        if (projectId) {
          formData.append('postId', projectId);

          await updatePost(formData);

          navigate('/projects/' + projectId);
        } else {
          const res = await createPost(formData);

          if (res !== null) {
            const { _id } = res;
            navigate('/projects/' + _id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    validate: ({ title, requirements }: FormValues) => {
      const newErrors: FormErrors = {};
      // 아래 validation은 mui required에서 제공하고 있어서 생략할 예정
      if (!prevTitle && !title) newErrors.title = '제목을 입력해주세요.';
      if (!prevRequirements && !requirements)
        newErrors.requirements = '요구사항을 입력해주세요.';

      return newErrors;
    },
  });

  return isLoading ? (
    <Box>로딩중</Box>
  ) : (
    <FormBox onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box />
        {imageFile ? (
          <PreviewImageBox src={imageFile} alt="프로필 이미지" />
        ) : (
          <UploadStyledButton variant="outlined" component="label">
            <Box>Click to Upload</Box>
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </UploadStyledButton>
        )}
        <BasicInput
          defaultValue={prevTitle}
          label="title"
          type="multiline"
          onChange={handleChange}
          placeholder={prevTitle ? '' : '제목을 입력해주세요'}
          errorMessage={errors.title}
        />
        <BasicInput
          defaultValue={prevRequirements}
          label="requirements"
          type="multiline"
          onChange={handleChange}
          placeholder={prevRequirements ? '' : '요구사항을 입력해주세요'}
          errorMessage={errors.requirements}
        />
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
