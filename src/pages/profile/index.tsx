import { Link, useParams, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Navbar from '@/components/navbar';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import ProjectCardItem from '@/components/shared/projectCard';
import BasicAvatar from '@/components/shared/avatar';
import BasicButton from '@/components/shared/button';
import BgProfile from '@/components/profile/bgProfile';
import { getUser } from '@/api/user';
import { UserType } from '@/types';
import ProfileNav from '@/components/profile/profileNav';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState<number | string>(0);
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
    const myId = JSON.parse(sessionStorage.getItem('USER') as string);
    return myId._id === userId;
  };
  useEffect(() => {
    if (userId) {
      const requestUser = async (userId: string) => {
        const getUserInfo = await getUser(userId);
        setCurrentUser(getUserInfo);
      };
      requestUser(userId);
    }
  }, [userId]);
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
          {checkIsMe() || (
            <StyledBasicButtonStack direction={'row'}>
              <BasicButton variant="outlined" children="팔로우" />
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
