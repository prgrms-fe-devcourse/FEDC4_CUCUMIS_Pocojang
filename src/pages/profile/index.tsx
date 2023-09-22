import { Link } from 'react-router-dom';
import { Box, Stack, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import ProfileNav from '@/components/profile/profileNav';
import useProfile from '@/components/profile/useProfile';
import ProfileChangeButton from '@/components/profile/profileChangeButton';

const ProfilePage = () => {
  const {
    navigationData,
    value,
    navigationMoving,
    userState,
    buttonState,
    checkFollowingStatus,
    isMe,
    goNextPage,
    userId,
    handleFileChange,
  } = useProfile();

  return (
    <StyledWrapperBox>
      <StyledBox>
        {isMe(userId as string) && (
          <ProfileChangeButton
            onChange={handleFileChange}
            id={'background-photo'}
          />
        )}
        <BgProfile
          variant="square"
          sx={{ width: '100%', height: '141px' }}
          src={userState?.coverImage as string}
        />
        <StyledProfileWrapper>
          <StyledBasicAvatar
            imgSrc={userState?.image as string}
            alt="프로필사진"
            size={90}
            isUserOn={true}
          />
          {isMe(userId as string) && (
            <ProfileChangeButton
              onChange={handleFileChange}
              id={'profile-photo'}
            />
          )}
        </StyledProfileWrapper>
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <h3>
            {userState ? (
              userState.fullName
            ) : (
              <SkeletonStyled animation="wave" />
            )}
          </h3>
          {isMe(userId as string) && (
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          )}
        </Stack>
      </StyledBox>
      <StyledBox>
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {isMe(userId as string) || (
            <StyledBasicButtonStack direction={'row'}>
              <BasicButton
                variant="outlined"
                children={buttonState ? '팔로잉 취소' : '팔로잉'}
                onClick={async () => {
                  await checkFollowingStatus(
                    buttonState as boolean,
                    userId as string,
                  );
                }}
              />
              <BasicButton
                variant="outlined"
                children="DM"
                onClick={() => goNextPage(`/dm/${userId}`)}
              />
            </StyledBasicButtonStack>
          )}
        </Stack>
      </StyledBox>
      <StyledMavigationBox>
        <ProfileNav
          value={value}
          navigationData={navigationData}
          onChange={navigationMoving}
        />
        <StyledContentsWrapper>
          {value === 0 ? (
            <StyledItemWithAvatarBox>
              {userState &&
                userState.following.map(({ user }) => {
                  return (
                    <ItemWithAvatar
                      name={user}
                      AvatarProps={{
                        imgSrc: user,
                      }}
                      to={`/profile/${user}`}
                    />
                  );
                })}
            </StyledItemWithAvatarBox>
          ) : value === 1 ? (
            <StyledItemWithAvatarBox>
              {userState &&
                userState.followers.map(({ follower }) => {
                  return (
                    <ItemWithAvatar
                      name={follower}
                      AvatarProps={{
                        imgSrc: follower,
                      }}
                      to={`/profile/${follower}`}
                    />
                  );
                })}
            </StyledItemWithAvatarBox>
          ) : value === 2 ? (
            <>
              {userState &&
                userState.posts.map(({ _id, title, image }) => (
                  <StyledProjectCardItemBox key={_id}>
                    <ProjectCardItem
                      name={JSON.parse(title).requirements}
                      imageUrl={image as string}
                      to={`${_id}`}
                      projectTitle={JSON.parse(title).title}
                    />
                  </StyledProjectCardItemBox>
                ))}
            </>
          ) : (
            <>
              {userState &&
                userState.posts.map(({ _id, title, image }) => (
                  <StyledProjectCardItemBox key={_id}>
                    <ProjectCardItem
                      name={JSON.parse(title).requirements}
                      imageUrl={image as string}
                      to={`${_id}`}
                      projectTitle={JSON.parse(title).title}
                    />
                  </StyledProjectCardItemBox>
                ))}
            </>
          )}
        </StyledContentsWrapper>
      </StyledMavigationBox>
      <Navbar />
    </StyledWrapperBox>
  );
};

const StyledBasicAvatar = styled(BasicAvatar)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
const StyledBox = styled(Box)({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
});
const StyledProfileWrapper = styled(Box)({
  width: 'fit-content',
  height: 'fit-content',
  position: 'relative',
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const StyledBasicButtonStack = styled(Stack)({
  width: '100%',
});
const StyledWrapperBox = styled(Box)({
  height: '750px',
  display: 'flex',
  flexDirection: 'column',
});

const StyledMavigationBox = styled(Box)({
  margin: '30px 0',
});

const StyledContentsWrapper = styled(Box)({
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 1px 3px',
  overflowY: 'scroll',
  padding: '10px',
  height: '300px',
});

const StyledItemWithAvatarBox = styled(Box)({
  borderRadius: '5px',
  height: '100%',
});

const StyledProjectCardItemBox = styled(Box)({
  width: '90%',
  margin: '10px auto',
});

const SkeletonStyled = styled(Skeleton)({
  width: '100%',
  height: '100%',
});
export default ProfilePage;
