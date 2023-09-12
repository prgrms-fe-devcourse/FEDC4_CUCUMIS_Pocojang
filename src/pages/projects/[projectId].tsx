import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import useProjectDetails from '@/pages/projects/useProjectDetails';
import BasicChip from '@/components/shared/chip';
import { PROFILE_URL, PROJECT_MODIFYL_URL } from '@/consts/routes';

export default function ProjectDetailPage() {
  const {
    projectId,
    author,
    image,
    _id,
    title,
    contents,
    comments,
    createdAt,
    onClick,
    isAuthor,
  } = useProjectDetails();

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
        <BasicAvatar {...author} onClick={() => onClick(PROFILE_URL, _id)} />
        <TitleBoxStyled>
          <Typography noWrap>{author.fullName}</Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" color="gray">
              {createdAt}
            </Typography>
            {isAuthor && (
              <BasicChip
                size="small"
                label="수정하기"
                variant="outlined"
                onClick={() =>
                  onClick(PROJECT_MODIFYL_URL, projectId as string)
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
        {comments.map((data, i) => (
          <ItemWithAvatar
            {...data}
            key={i}
            isComment={true}
            AvatarProps={{ onClick: () => onClick(PROFILE_URL, data._id) }}
          />
        ))}
      </Box>
    </Stack>
  );
}

const ProjectImageStyled = styled(Box)({
  width: '100%',
  height: '40vh',
  objectFit: 'cover',
}) as typeof Box;

const TitleBoxStyled = styled(Box)({
  minWidth: 0,
  marginRight: '16px',
  width: '100%',
});
