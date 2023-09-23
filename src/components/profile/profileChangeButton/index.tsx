import { ChangeCircle } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';

interface Props {
  left?: string;
  top?: string;
  transform?: string;
}
interface Type {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  left?: string;
  top?: string;
  transform?: string;
}

const ProfileChangeButton = ({ onChange, id, left, top, transform }: Type) => {
  return (
    <InputBoxStyled
      left={left as string}
      top={top as string}
      transform={transform}
    >
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

const InputBoxStyled = styled(Box)(({ left, top, transform }: Props) => ({
  position: 'absolute',
  left: left || '0',
  top: top || '0',
  zIndex: '1000',
  transform: transform || 'translateX(-50%)',
}));

export default ProfileChangeButton;
