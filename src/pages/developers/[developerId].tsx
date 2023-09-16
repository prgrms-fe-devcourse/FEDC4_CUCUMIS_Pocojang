import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import { PROFILE_URL, PROJECT_MODIFYL_URL, DM_URL } from '@/consts/routes';
import BasicButton from '@/components/shared/button';
import useDeveloperDetails from '@/components/developers/useDeveloperDetail';
import Comments from '@/components/comments';

const DEFAULT_IMAGE = 'https://source.unsplash.com/random';

export default function DeveloperDetail() {
  const {
    developerId,
    author,
    image = DEFAULT_IMAGE,
    comments,
    contents,
    handleClick,
    isAuthor,
    isLoading,
  } = useDeveloperDetails();

  return isLoading ? (
    <Box>로딩 중</Box>
  ) : (
    <Stack spacing={3}>
      <Box>
        <ProjectImageStyled
          component="img"
          src={image}
          alt={contents.oneLiner + "'s project image"}
        />
        <StackStyled direction="column" alignItems="center">
          <BasicAvatar
            {...author}
            size={90}
            onClick={() => handleClick(PROFILE_URL, author.userId)}
          />
          <Typography noWrap>{author.fullName}</Typography>
        </StackStyled>
      </Box>
      {isAuthor ? (
        <ChipBoxStyled>
          <BasicChip
            size="small"
            label="수정하기"
            variant="outlined"
            onClick={() =>
              handleClick(PROJECT_MODIFYL_URL, developerId as string)
            }
          />
        </ChipBoxStyled>
      ) : (
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <BasicButton variant="outlined">팔로우</BasicButton>
          <BasicButton
            variant="outlined"
            onClick={() => handleClick(DM_URL, developerId as string)}
          >
            DM
          </BasicButton>
        </Stack>
      )}
      <Stack spacing={1}>
        <Typography variant="h4">
          {contents.oneLiner}
          <ChipStyled
            label={contents.position}
            margin="0 8px"
            color="secondary"
          />
        </Typography>
        <ChipsBoxStyled>
          {contents.techStack?.map((skill: string, i: number) => (
            <ChipStyled label={skill} margin="0 8px 4px 0" key={i} />
          ))}
        </ChipsBoxStyled>
      </Stack>
      <Box>
        <Typography color="gray">자기소개</Typography>
        <Typography>{contents.details}</Typography>
      </Box>
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

const StackStyled = styled(Stack)({
  marginTop: '-5vh',
});

const ChipBoxStyled = styled(Box)({
  textAlign: 'center',
});

const ChipsBoxStyled = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
});

const ChipStyled = styled(BasicChip)<{ margin: string }>(({ margin }) => ({
  margin: margin,
}));
