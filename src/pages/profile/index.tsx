import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import { getUserId } from '@/api/users/userId';
import { UserType } from '@/types';
import ProfileNav from '@/components/profile/profileNav';
import { followUser } from '@/api/follow/create';
import { unFollowUser } from '@/api/follow/delete';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [buttonText, setButtonText] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState<number | string>(0);
  const myAccount = JSON.parse(sessionStorage.getItem('USER') as string);

  const navigationData = [
    { label: currentUser?.following.length || 0, title: '팔로잉' },
    { label: currentUser?.followers.length || 0, title: '팔로워' },
    { label: currentUser?.posts.length || 0, title: '포스트' },
    { label: currentUser?.likes.length || 0, title: '스크랩' },
  ];

  const pageMove = (url: string) => {
    navigate(url);
  };

  const checkIsMe = () => {
    return myAccount._id === userId;
  };

  const requestFollowing = async () => {
    const request = await followUser({ userId: userId as string });
    // TODO : 낙관적 업데이트 해줘야 함. => followList나 number등을 전부 state로 다룰 예정!
    console.log(request);
    setButtonText(true);
  };

  const deleteFollowing = async (id = '') => {
    const data = await unFollowUser({ id: id });
    console.log(data);
    setButtonText(false);
  };

  useEffect(() => {
    if (userId) {
      const isExistInMyFollowingList = async () => {
        const myData = await getUserId(myAccount._id);
        const result = myData.following.find((e) => e.user === userId);
        result ? setButtonText(true) : setButtonText(false);
      };
      const requestUser = async (userId: string) => {
        const getUser = await getUserId(userId);
        setCurrentUser(getUser);
      };
      isExistInMyFollowingList();
      requestUser(userId);
    }
  }, [userId, myAccount._id]);
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
              <h3>{currentUser?.fullName}</h3>
              {checkIsMe() && (
                <Link to="/settings">
                  <SettingsIcon />
                </Link>
              )}
            </Stack>
          </Box>
          {checkIsMe() || (
            <StyledBasicButtonStack direction={'row'}>
              <BasicButton
                variant="outlined"
                children={buttonText ? '팔로잉 취소' : '팔로잉'}
                onClick={async () => {
                  const myData = await getUserId(myAccount._id);
                  const followingObj = myData.following.find(
                    (e) => e.user === userId,
                  );
                  buttonText
                    ? deleteFollowing(followingObj?._id)
                    : requestFollowing();
                }}
              />
              <BasicButton
                variant="outlined"
                children="DM"
                onClick={() => pageMove(`/dm/${userId}`)}
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
              {currentUser &&
                currentUser.following.map(({ user }) => {
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
              {currentUser &&
                currentUser.followers.map(({ follower }) => {
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
              {currentUser &&
                currentUser.posts.map(({ _id, title, image }) => (
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
              {currentUser &&
                currentUser.posts.map(({ _id, title, image }) => (
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

// const StyledProjectCardItem = styled(ProjectCardItem)({
//   border: '3px solid black',
// });
const StyledProjectCardItemBox = styled(Box)({
  width: '90%',
  margin: '10px auto',
});

export default ProfilePage;
