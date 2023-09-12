import styled from '@emotion/styled';
import { Avatar, Box } from '@mui/material';

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
        </StyledBasicAvatarBox>
      </StyledBox>

      {settingData.map(({ data }) => (
        <StyledBasicInputBox>
          <BasicInput label={data} />
        </StyledBasicInputBox>
      ))}
      <StyledBasicFab onClick={toggleDark} children={'dark'} />
      <BasicButton children="수정하기" />
    </StyledWrapper>
  );
}

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

const StyledBasicInputBox = styled(Box)({
  margin: '10px 0',
});

const StyledWrapper = styled(Box)({
  position: 'relative',
  padding: '5px',
});

const StyledBasicFab = styled(BasicFab)({
  position: 'absolute',
  bottom: '10px',
  right: 0,
});
