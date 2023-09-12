import Fab, { FabProps } from '@mui/material/Fab';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

interface Props extends FabProps {
  bottom?: number;
  right?: number;
  children: React.ReactNode;
  onClick: () => void;
}

const BasicFab = ({
  bottom = 80,
  right = 20,
  children,
  onClick,
  ...props
}: Props) => {
  return (
    <BoxStyled>
      <FabStyled
        bottom={bottom}
        right={right}
        color="primary"
        onClick={onClick}
        {...props}
      >
        {children}
      </FabStyled>
    </BoxStyled>
  );
};

const FabStyled = styled(Fab)<{ bottom: number; right: number }>(
  ({ bottom, right }) => ({
    position: 'absolute',
    bottom: `${bottom}px`,
    right: `${right}px`,
    pointerEvents: 'auto',
  }),
);

const BoxStyled = styled(Box)({
  zIndex: '10',
  maxWidth: '600px',
  bottom: '0',
  width: '100%',
  height: 'calc(100vh - 80px)',
  position: 'fixed',
  left: '50%',
  transform: 'translate(-50%)',
  pointerEvents: 'none',
});
export default BasicFab;
