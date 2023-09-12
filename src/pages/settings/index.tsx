import styled from '@emotion/styled';
import { Avatar, Box, Stack } from '@mui/material';
import { DarkMode } from '@mui/icons-material';

import BasicAvatar from '@/components/shared/avatar';
import BasicInput from '@/components/shared/input';
import BasicButton from '@/components/shared/button';
import BasicFab from '@/components/shared/fab';

export default function SettingsPage() {
  const settingData = [
    { data: '이름' },
    { data: 'password' },
    { data: 'password confirm' },
    { data: 'One Liner' },
    { data: 'Technical Tools(option)' },
    { data: 'Position(option)' },
    { data: 'Details(option)' },
  ];
  const toggleDark = () => {
    alert('dark toggled!');
  };
  return (
    <StyledWrapper>
      <StyledBox>
        <Avatar
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
          </Stack>
        </Box>
      </Stack>
      {settingData.map(({ data }) => (
        <StyledBasicInputBox>
          <BasicInput placeholder={data} label={data} />
        </StyledBasicInputBox>
      ))}
      <StyledBasicFab onClick={toggleDark} children={<DarkMode />} />
      <BasicButton children="수정하기" />
    </StyledWrapper>
  );
}

const StyledBasicAvatar = styled(BasicAvatar)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
const StyledBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '200px',
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

const StyledBasicInputBox = styled(Box)({
  margin: '10px 0',
});

const StyledWrapper = styled(Box)({
  position: 'relative',
});

const StyledBasicFab = styled(BasicFab)({
  position: 'absolute',
  bottom: '10px',
  right: 0,
});
