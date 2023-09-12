import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import styled from '@emotion/styled';

import BasicAvatar from '@/components/shared/avatar';
import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import BasicButton from '@/components/shared/button';
import ProjectCardItem from '@/components/shared/projectCard';

import DUMMY_DATA from './DUMMY_DATA';

const ProfilePage = () => {
  const { userId } = useParams();
  const [value, setValue] = useState(0);

  return (
    <StyledWrapperBox>
      <StyledBox>
        <StyledAvatar
          alt="Remy Sharp"
          src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg"
          sx={{ width: 394, height: 151 }}
          variant="square"
        />
        <StyledBasicAvatarBox>
          <BasicAvatar
            isUserOn={true}
            size={90}
            imgSrc={
              'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg'
            }
            alt={'user profile'}
          />
        </StyledBasicAvatarBox>
      </StyledBox>
      <StyledStackBox>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          지성
          {userId === '1' && (
            <Link to={'/settings'}>
              <SettingsIcon />
            </Link>
          )}
        </Stack>
        <div>
          {userId !== '1' && (
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <BasicButton variant="outlined" children="팔로우" />
              <BasicButton variant="outlined" children="DM" />
            </Stack>
          )}
        </div>
      </StyledStackBox>
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
          )}
        </StyledContentsWrapper>
      </StyledMavigationBox>
      <Navbar />
    </StyledWrapperBox>
  );
};
const StyledBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '200px',
  textAlign: 'center',
});

const StyledAvatar = styled(Avatar)({
  border: '3px solid',
  position: 'absolute',
  width: '100%',
  height: '95%',
});

const StyledBasicAvatarBox = styled(Box)({
  width: '90px',
  height: '100px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: -10,
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
  height: '450px',
  overflowY: 'scroll',
  padding: '10px',
});

const StyledItemWithAvatarBox = styled(Box)({
  borderRadius: '5px',
  height: '100%',
});

const StyledProjectCardItemBox = styled(Box)({
  width: 'fit-content',
  margin: '10px auto',
});

const StyledStackBox = styled(Box)({
  width: '100%',
  border: '3px solid',
  padding: '10px 0',
});

export default ProfilePage;
