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
import ProjectCardItem from '@/components/shared/projectCard';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';

const ProfilePage = () => {
  const { userId } = useParams();
  const [value, setValue] = useState(0);
  const LIST_DUMMY_DATA = [
    { label: 320, title: '팔로잉' },
    { label: 321, title: '팔로워' },
    { label: 10, title: '포스트' },
    { label: 7, title: '스크랩' },
  ];
  const FOLLOWING_DUMMY_DATA = [
    {
      userName: '유저1',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저2',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저3',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저4',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
  ];
  const FOLLOWER_DUMMY_DATA = [
    {
      userName: '유저1',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저2',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저3',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저4',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저5',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
    {
      userName: '유저6',
      userImgUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    },
  ];

  const CARD_DUMMY_DATA = [
    {
      name: '지성1',
      imageUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      to: '1',
      projectTitle: 'project1',
    },
    {
      name: '지성2',
      imageUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      to: '2',
      projectTitle: 'project2',
    },
    {
      name: '지성3',
      imageUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      to: '3',
      projectTitle: 'project3',
    },
    {
      name: '지성4',
      imageUrl:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      to: '4',
      projectTitle: 'project4',
    },
  ];
  return (
    <div>
      {/* ❗️프로필❗️ */}
      <StyledBox>
        <StyledAvatar
          alt="Remy Sharp"
          src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg"
          sx={{ width: 394, height: 141 }}
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
          <StyledStack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <p>{userId}</p>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </StyledStack>
        </StyledBasicAvatarBox>
      </StyledBox>
      {/* ❗️프로필 끝❗️ */}

      <StyledMavigationBox>
        <BottomNavigation
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          {LIST_DUMMY_DATA.map(({ label, title }) => (
            <BottomNavigationAction label={label} icon={title} />
          ))}
        </BottomNavigation>

        {value === 0 ? (
          <StyledItemWithAvatarBox>
            {FOLLOWING_DUMMY_DATA.map(({ userName, userImgUrl }) => (
              <ItemWithAvatar
                name={userName}
                AvatarProps={{
                  imgSrc: userImgUrl,
                }}
              />
            ))}
          </StyledItemWithAvatarBox>
        ) : value === 1 ? (
          <StyledItemWithAvatarBox>
            {FOLLOWER_DUMMY_DATA.map(({ userName, userImgUrl }) => (
              <ItemWithAvatar
                name={userName}
                AvatarProps={{
                  imgSrc: userImgUrl,
                }}
              />
            ))}
          </StyledItemWithAvatarBox>
        ) : value === 2 ? (
          <StyledProjectCardBox>
            {CARD_DUMMY_DATA.map(({ name, imageUrl, to, projectTitle }) => (
              <StyledProjectCardWrapper>
                <StyledProjectCard
                  name={name}
                  imageUrl={imageUrl}
                  to={to}
                  projectTitle={projectTitle}
                />
              </StyledProjectCardWrapper>
            ))}
          </StyledProjectCardBox>
        ) : (
          <StyledProjectCardBox>
            {CARD_DUMMY_DATA.map(({ name, imageUrl, to, projectTitle }) => (
              <StyledProjectCardWrapper>
                <StyledProjectCard
                  name={name}
                  imageUrl={imageUrl}
                  to={to}
                  projectTitle={projectTitle}
                />
              </StyledProjectCardWrapper>
            ))}
          </StyledProjectCardBox>
        )}
      </StyledMavigationBox>
      <Navbar />
    </div>
  );
};
const StyledBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '200px',
  textAlign: 'center',
});

const StyledAvatar = styled(Avatar)({
  position: 'absolute',
  width: '100%',
  height: '85%',
});

const StyledBasicAvatarBox = styled(Box)({
  width: '90px',
  height: '100px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: 0,
});

const StyledStack = styled(Stack)({
  padding: '-20 0',
});

const StyledMavigationBox = styled(Box)({
  margin: '30px 0',
});

// 카드 박스
const StyledProjectCardBox = styled(Box)({
  textAlign: 'center',
  height: '400px',
  overflowY: 'scroll',
});

const StyledProjectCard = styled(ProjectCardItem)({
  padding: '20px',
  border: '3px solid black',
});

const StyledProjectCardWrapper = styled(Box)({
  width: 'fit-content',
  margin: '10px auto',
});

const StyledItemWithAvatarBox = styled(Box)({
  margin: '20px',
  padding: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 6px',
  borderRadius: '5px',
});
export default ProfilePage;
