import { Box, LinearProgress } from '@mui/material';
import styled from '@emotion/styled';

const FixedProgress = () => {
  return (
    <BoxStyled>
      <LinearProgressStyled />
    </BoxStyled>
  );
};
const BoxStyled = styled(Box)({
  zIndex: '10',
  maxWidth: '600px',
  top: '0',
  height: '66px',
  width: '100%',
  position: 'fixed',
  left: '50%',
  transform: 'translate(-50%)',
  pointerEvents: 'none',
});
const LinearProgressStyled = styled(LinearProgress)({
  position: 'absolute',
  bottom: '0',
  height: '10px',
  width: '100%',
});

export default FixedProgress;
