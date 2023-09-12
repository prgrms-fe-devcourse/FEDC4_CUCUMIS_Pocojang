import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { FabProps } from '@mui/material/Fab';

import BasicFab from '@/components/shared/fab';

interface Props extends FabProps {
  bottom?: number;
  right?: number;
  children: React.ReactNode;
}

const MainFab = ({ bottom = 80, right = 20, children, ...props }: Props) => {
  return (
    <BoxStyled>
      <FabStyled bottom={bottom} right={right} {...props}>
        {children}
      </FabStyled>
    </BoxStyled>
  );
};

const FabStyled = styled(BasicFab)<{ bottom: number; right: number }>(
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

export default MainFab;
