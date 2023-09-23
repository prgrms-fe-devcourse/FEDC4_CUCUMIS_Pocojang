import styled from '@emotion/styled';
import { Box, Divider, LinearProgress, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import Comments from '@/components/comments';
import useProjectDetail from '@/components/projects/useProjectDetail';
import ChipGroup from '@/components/shared/chipGroup';
import FullLineTyphography from '@/components/shared/fullLineTyphograhy';

const DEFAULT_IMAGE = '/assets/Logo96.svg';

export default function ProjectDetailPage() {
  const {
    author,
    image = DEFAULT_IMAGE,
    contents,
    createdAt,
    handleAvatarClick,
    handleSettingClick,
    handleDeleteClick,
    isAuthor,
    isLoading,
  } = useProjectDetail();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={3}>
      <ProjectImageBox
        component="img"
        src={image}
        alt={contents.title + "'s project image"}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        alignContent="center"
      >
        <BasicAvatar imgSrc={author.image} onClick={handleAvatarClick} />
        <TitleBox>
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
              <ChipGroup>
                <BasicChip
                  label="수정"
                  variant="outlined"
                  onClick={handleSettingClick}
                />
                <BasicChip
                  label="삭제"
                  variant="outlined"
                  onClick={handleDeleteClick}
                />
              </ChipGroup>
            )}
          </Stack>
        </TitleBox>
      </Stack>
      <FullLineTyphography variant="h4">{contents.title}</FullLineTyphography>
      <Stack spacing={1}>
        <Typography color="gray">요구사항</Typography>
        <FullLineTyphography>{contents.requirements}</FullLineTyphography>
      </Stack>
      <Divider variant="middle" />
      <Box>
        <Typography color="gray">댓글</Typography>
        <Comments />
      </Box>
    </Stack>
  );
}

const ProjectImageBox = styled(Box)({
  width: '100%',
  height: '30vh',
  objectFit: 'cover',
}) as typeof Box;

const TitleBox = styled(Box)({
  minWidth: 0,
  marginRight: '16px',
  width: '100%',
});
