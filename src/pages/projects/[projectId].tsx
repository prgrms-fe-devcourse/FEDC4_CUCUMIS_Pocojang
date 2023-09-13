import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import { PROFILE_URL, PROJECT_MODIFYL_URL } from '@/consts/routes';
import Comments from '@/components/comments';
import useProjectDetail from '@/components/projects/useProjectDetail';

const DEFAULT_IMAGE = 'https://source.unsplash.com/random';

export default function ProjectDetailPage() {
  const {
    projectId,
    author,
    image = DEFAULT_IMAGE,
    _id,
    title,
    contents,
    comments,
    createdAt,
    handleClick,
    isAuthor,
  } = useProjectDetail();

  return (
    <Stack spacing={3}>
      <ProjectImageStyled
        component="img"
        src={image}
        alt={title + "'s project image"}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        alignContent="center"
      >
        <BasicAvatar
          {...author}
          onClick={() => handleClick(PROFILE_URL, _id)}
        />
        <TitleBoxStyled>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack alignItems="flex-start">
              <Typography noWrap>{author.fullName}</Typography>
              <Typography variant="subtitle2" color="gray">
                {createdAt}
              </Typography>
            </Stack>
            {isAuthor && (
              <BasicChip
                label="수정하기"
                variant="outlined"
                onClick={() =>
                  handleClick(PROJECT_MODIFYL_URL, projectId as string)
                }
              />
            )}
          </Stack>
        </TitleBoxStyled>
      </Stack>
      <Typography variant="h4">{title}</Typography>
      <Stack spacing={1}>
        <Typography color="gray">요구사항</Typography>
        <Typography>{contents}</Typography>
      </Stack>
      <Divider variant="middle" />
      <Box>
        <Typography color="gray">댓글</Typography>
        <Comments comments={comments} onClick={handleClick} url={PROFILE_URL} />
      </Box>
    </Stack>
  );
}

const ProjectImageStyled = styled(Box)({
  width: '100%',
  height: '30vh',
  objectFit: 'cover',
}) as typeof Box;

const TitleBoxStyled = styled(Box)({
  minWidth: 0,
  marginRight: '16px',
  width: '100%',
});
