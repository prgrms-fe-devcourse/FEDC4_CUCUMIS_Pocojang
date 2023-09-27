import styled from '@emotion/styled';
import { Box, Divider, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import BasicButton from '@/components/shared/button';
import useDeveloperDetails from '@/components/developers/useDeveloperDetail';
import Comments from '@/components/comments';
import ChipGroup from '@/components/shared/chipGroup';
import FullLineTyphography from '@/components/shared/fullLineTyphograhy';

const DEFAULT_IMAGE = '/assets/Logo96.svg';

export default function DeveloperDetail() {
  const {
    author,
    contents,
    handleSettingClick,
    handleDMClick,
    handleAvatarClick,
    handleDeleteClick,
    handleFollowClick,
    isAuthor,
    isLoading,
    isUserFollowing,
    isFollowButtonClicked,
    isLoggedIn,
  } = useDeveloperDetails();

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Stack spacing={3}>
      <Box>
        <ProjectImageBox
          component="img"
          src={author.coverImage ?? DEFAULT_IMAGE}
          alt={contents.oneLiner + "'s project image"}
        />
        <StackContainer direction="column" alignItems="center">
          <BasicAvatar
            {...author}
            imgSrc={author.image}
            isUserOn={author.isOnline}
            size={90}
            onClick={handleAvatarClick}
          />
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
                  <FollowButton
                    variant="outlined"
                    onClick={handleFollowClick}
                    isClicked={isFollowButtonClicked}
                  >
                    팔로잉 취소
                  </FollowButton>
                ) : (
                  <FollowButton
                    variant="outlined"
                    onClick={handleFollowClick}
                    isClicked={isFollowButtonClicked}
                  >
                    팔로잉
                  </FollowButton>
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
        <FullLineTyphography variant="h4">
          {contents.oneLiner}
          {contents.position && (
            <ChipContainer
              label={contents.position}
              margin="0 8px"
              color="secondary"
            />
          )}
        </FullLineTyphography>
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
          <FullLineTyphography>{contents.details}</FullLineTyphography>
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

const FollowButton = styled(BasicButton, {
  shouldForwardProp: (prop) => prop !== 'isClicked',
})(({ isClicked }: { isClicked: boolean }) => ({
  cursor: isClicked ? 'wait' : 'pointer',
}));
