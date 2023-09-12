import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import useProjectDetails from '@/pages/projects/useProjectDetails';

export default function ProjectDetailPage() {
  const {
    author,
    image,
    _id,
    title,
    contents,
    comments,
    createdAt,
    onClickProfile,
  } = useProjectDetails();

  return (
    <Stack spacing={3}>
      <ProjectImageStyled
        component="img"
        src={image}
        alt={title + "'s project image"}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <BasicAvatar {...author} onClick={() => onClickProfile(_id)} />
        <TitleBoxStyled>
          <Typography noWrap>{author.fullName}</Typography>
          <Typography variant="subtitle2" color="gray">
            {createdAt}
          </Typography>
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
            AvatarProps={{ onClick: () => onClickProfile(data._id) }}
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
});
