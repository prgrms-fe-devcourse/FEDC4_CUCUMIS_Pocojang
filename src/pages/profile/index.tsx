import { Link, useParams } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import DUMMY_DATA from '@/components/profile/useProfile';

const ProfilePage = () => {
  const { userId } = useParams();
  const [value, setValue] = useState(0);

  return (
    <StyledWrapperBox>
      <StyledBox>
        <BgProfile
          variant="square"
          sx={{ width: '100%', height: '141px' }}
          src={
            'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'
          }
        />
        <StyledProfileWrapper>
          <StyledBasicAvatar
            imgSrc="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg"
            alt="프로필사진"
            size={90}
            isUserOn={true}
          />
        </StyledProfileWrapper>
      </StyledBox>
      <StyledBox>
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <p>이름</p>
              <Link to="/settings">
                <SettingsIcon />
              </Link>
            </Stack>
          </Box>
          {userId !== '1' && (
            <StyledBasicButtonStack direction={'row'}>
              <BasicButton variant="outlined" children="팔로우" />
              <BasicButton variant="outlined" children="DM" />
            </StyledBasicButtonStack>
          )}
        </Stack>
      </StyledBox>
      <StyledMavigationBox>
        <BottomNavigation
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          {DUMMY_DATA.LIST_DUMMY_DATA.map(({ label, title }) => (
            <BottomNavigationAction label={label} icon={title} />
          ))}
        </BottomNavigation>

        <StyledContentsWrapper>
          {value === 0 ? (
            <StyledItemWithAvatarBox>
              {DUMMY_DATA.FOLLOWING_DUMMY_DATA.map(
                ({ userName, userImgUrl }) => (
                  <ItemWithAvatar
                    name={userName}
                    AvatarProps={{
                      imgSrc: userImgUrl,
                    }}
                  />
                ),
              )}
            </StyledItemWithAvatarBox>
          ) : value === 1 ? (
            <StyledItemWithAvatarBox>
              {DUMMY_DATA.FOLLOWER_DUMMY_DATA.map(
                ({ userName, userImgUrl }) => (
                  <ItemWithAvatar
                    name={userName}
                    AvatarProps={{
                      imgSrc: userImgUrl,
                    }}
                  />
                ),
              )}
            </StyledItemWithAvatarBox>
          ) : value === 2 ? (
            <>
              {DUMMY_DATA.CARD_DUMMY_DATA.map(
                ({ name, imageUrl, to, projectTitle }) => (
                  <StyledProjectCardItemBox>
                    <ProjectCardItem
                      name={name}
                      imageUrl={imageUrl}
                      to={to}
                      projectTitle={projectTitle}
                    />
                  </StyledProjectCardItemBox>
                ),
              )}
            </>
          ) : (
            <>
              {DUMMY_DATA.CARD_DUMMY_DATA.map(
                ({ name, imageUrl, to, projectTitle }) => (
                  <StyledProjectCardItemBox>
                    <StyledProjectCardItem
                      name={name}
                      imageUrl={imageUrl}
                      to={to}
                      projectTitle={projectTitle}
                    />
                  </StyledProjectCardItemBox>
                ),
              )}
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

const StyledProjectCardItem = styled(ProjectCardItem)({
  border: '3px solid black',
});
const StyledProjectCardItemBox = styled(Box)({
  width: '90%',
  margin: '10px auto',
});

export default ProfilePage;
