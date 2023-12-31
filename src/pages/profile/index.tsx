import { Link } from 'react-router-dom';
import { Box, Stack, Skeleton, LinearProgress } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import ProfileNav from '@/components/profile/profileNav';
import useProfile from '@/components/profile/useProfile';
import ProfileChangeButton from '@/components/profile/profileChangeButton';
import NavigationProfileContent from '@/components/profile/navigationProfileContent';

const ProfilePage = () => {
  const {
    loading,
    navigate,
    navigationData,
    currentNavTab,
    navigationMoving,
    userState,
    buttonState,
    checkFollowingStatus,
    isMe,
    userId,
    handleFileChange,
  } = useProfile();

  return (
    <StyledWrapperBox>
      <StyledBox>
        {loading && <LinearProgress />}
        {isMe(userId as string) && (
          <>
            <ProfileChangeButton
              left="0"
              top="0"
              transform="0"
              onChange={handleFileChange}
              id={'background-photo'}
            />
            <ProfileChangeButton
              left="50%"
              top="50%"
              transform="translateX(-50%)"
              onChange={handleFileChange}
              id={'profile-photo'}
            />
          </>
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
                onClick={() => navigate(`/dm/${userId}`)}
              />
            </StyledBasicButtonStack>
          )}
        </Stack>
      </StyledBox>
      <StyledNavigationBox>
        <ProfileNav
          value={currentNavTab}
          navigationData={navigationData}
          onChange={navigationMoving}
        />
        <StyledContentsWrapper>
          {!userState ? (
            <SkeletonStyled animation="wave" />
          ) : (
            <NavigationProfileContent
              userState={userState}
              value={String(currentNavTab)}
            />
          )}
        </StyledContentsWrapper>
      </StyledNavigationBox>
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

const StyledNavigationBox = styled(Box)({
  margin: '30px 0',
});

const StyledContentsWrapper = styled(Box)({
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 1px 3px',
  overflowY: 'scroll',
  padding: '10px',
  height: '300px',
});

const SkeletonStyled = styled(Skeleton)({
  width: '100%',
  height: '100%',
});

export default ProfilePage;
