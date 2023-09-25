import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, LinearProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

import BasicInput from '@/components/shared/input';
import usePost from '@/components/projects/usePost';
import BasicButton from '@/components/shared/button';
import useForm, { FormErrors, FormValues } from '@/hooks/useForm';
import { createPost, updatePost } from '@/api/posts';
import CHANNEL_ID from '@/consts/channels';
import { PROJECT_URL } from '@/consts/routes';
import { PROJECT_FORMDATA_KEY } from '@/consts/formDataKey';

export default function ProjectPost() {
  const navigate = useNavigate();

  const { TITLE, PROJECT_CHANNEL_ID, IMAGE, POST_ID } = PROJECT_FORMDATA_KEY;
  const {
    projectId,
    prevTitle,
    prevRequirements,
    isLoading,
    setLoadingState,
    handleFileChange,
    selectedFile,
    fileName,
    imageFile,
    handleDeleteFileData,
  } = usePost();

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: '',
      requirements: '',
    },
    onSubmit: async ({ title, requirements }: FormValues) => {
      const formatedTitle = JSON.stringify({
        title: title || prevTitle,
        requirements: requirements || prevRequirements,
      });

      const formData = new FormData();
      formData.append(TITLE, formatedTitle);
      formData.append(PROJECT_CHANNEL_ID, CHANNEL_ID.PROJECT);

      selectedFile && formData.append(IMAGE, selectedFile);

      try {
        setLoadingState(true);

        if (projectId) {
          formData.append(POST_ID, projectId);

          await updatePost(formData);

          navigate(PROJECT_URL + '/' + projectId, { replace: true });
        } else {
          const res = await createPost(formData);

          if (res !== null) {
            const { _id } = res;
            navigate(PROJECT_URL + '/' + _id, { replace: true });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingState(false);
      }
    },
    validate: ({ title, requirements }: FormValues) => {
      const newErrors: FormErrors = {};

      if (title && title.length > 50) {
        newErrors.title = '제목은 50자 이하로 입력해주세요.';
      }
      if (requirements && requirements.length > 1000) {
        newErrors.requirements = '요구사항은 1000자 이하로 입력해주세요.';
      }

      return newErrors;
    },
  });

  return isLoading ? (
    <LinearProgress />
  ) : (
    <FormBox onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box />
        {imageFile ? (
          <PreviewImageBox
            src={imageFile}
            alt="프로필 이미지"
            onClick={handleDeleteFileData}
          />
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
        {fileName && (
          <Stack direction="row" spacing={1}>
            <Typography>{fileName}</Typography>
            <CloseIcon color="secondary" onClick={handleDeleteFileData} />
          </Stack>
        )}
        <BasicInput
          defaultValue={prevTitle}
          label="title"
          type="multiline"
          onChange={handleChange}
          placeholder={prevTitle ? '' : '제목을 입력해주세요'}
          errorMessage={errors.title}
          inputProps={{ maxLength: '50' }}
        />
        <BasicInput
          defaultValue={prevRequirements}
          label="requirements"
          type="multiline"
          onChange={handleChange}
          placeholder={prevRequirements ? '' : '요구사항을 입력해주세요'}
          errorMessage={errors.requirements}
          inputProps={{ maxLength: '1000' }}
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
