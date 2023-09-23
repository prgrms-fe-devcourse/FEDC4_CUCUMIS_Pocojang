import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import BasicButton from '@/components/shared/button';
import useDeveloperDetails from '@/components/developers/useDeveloperDetail';
import Comments from '@/components/comments';
import ChipGroup from '@/components/shared/chipGroup';

const DEFAULT_IMAGE = '/assets/Logo96.svg';

export default function DeveloperDetail() {
  const {
    author,
    image = DEFAULT_IMAGE,
    contents,
    handleSettingClick,
    handleDMClick,
    handleAvatarClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor,
    isLoading,
    isUserFollowing,
    isLoggedIn,
  } = useDeveloperDetails();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={3}>
      <Box>
        <ProjectImageBox
          component="img"
          src={image}
          alt={contents.oneLiner + "'s project image"}
        />
        <StackContainer direction="column" alignItems="center">
          <BasicAvatar {...author} size={90} onClick={handleAvatarClick} />
          <Typography noWrap>{author.fullName}</Typography>
        </StackContainer>
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center">
        {isLoggedIn && (
          <>
            {isAuthor ? (
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
            ) : (
              <>
                {isUserFollowing ? (
                  <BasicButton variant="outlined" onClick={handleFollowClick}>
                    언팔로우
                  </BasicButton>
                ) : (
                  <BasicButton variant="outlined" onClick={handleFollowClick}>
                    팔로우
                  </BasicButton>
                )}
                <BasicButton variant="outlined" onClick={handleDMClick}>
                  DM
                </BasicButton>
              </>
            )}
          </>
        )}
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h4">
          {contents.oneLiner}
          {contents.position && (
            <ChipContainer
              label={contents.position}
              margin="0 8px"
              color="secondary"
            />
          )}
        </Typography>
        <ChipsBoxContainer>
          {Array.isArray(contents.techStack) &&
            contents.techStack?.map((skill: string, i: number) => (
              <ChipContainer label={skill} margin="0 8px 4px 0" key={i} />
            ))}
        </ChipsBoxContainer>
      </Stack>
      {contents.details && (
        <Box>
          <Typography color="gray">자기소개</Typography>
          <Typography>{contents.details}</Typography>
        </Box>
      )}
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

const StackContainer = styled(Stack)({
  marginTop: '-5vh',
});

const ChipsBoxContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
});

const ChipContainer = styled(BasicChip)<{ margin: string }>(({ margin }) => ({
  margin: margin,
}));
