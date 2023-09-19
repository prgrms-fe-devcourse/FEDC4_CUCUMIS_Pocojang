import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import ProfileNav from '@/components/profile/profileNav';
import ProfileChangeButton from '@/components/profile/profileChangeButton';
import useProfile from '@/components/profile/useProfile';

const ProfilePage = () => {
  const {
    navigationData,
    userState,
    buttonState,
    followingOrUnFollowing,
    isMe,
    goNextPage,
    userId,
    handleFileChange,
  } = useProfile();

  const [value, setValue] = useState<number | string>(0);
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
          <h3>{userState?.fullName}</h3>
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
                  const data = await followingOrUnFollowing(
                    buttonState as boolean,
                    userId as string,
                  );
                  console.log(data);
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
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
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
                      name={title}
                      imageUrl={image as string}
                      to={`/projects/${_id}`}
                      projectTitle={title}
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
                      name={title}
                      imageUrl={image as string}
                      to={`/projects/${_id}`}
                      projectTitle={title}
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

export default ProfilePage;
