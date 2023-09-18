import { ChangeCircle } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';

interface Type {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const ProfileChangeButton = ({ onChange, id }: Type) => {
  return (
    <InputBoxStyled>
      <input
        accept="image/*"
        id={id}
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <IconButton
          color="primary"
          component="span"
          style={{ whiteSpace: 'nowrap' }}
        >
          <ChangeCircle />
        </IconButton>
      </label>
    </InputBoxStyled>
  );
};

const InputBoxStyled = styled(Box)({
  position: 'absolute',
  left: '5px',
  top: '5px',
  zIndex: '1000',
});

export default ProfileChangeButton;
