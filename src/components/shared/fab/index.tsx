import Fab, { FabProps } from '@mui/material/Fab';
import styled from '@emotion/styled';

interface Props extends FabProps {
  children: React.ReactNode;
  onClick: () => void;
}

const BasicFab = ({ children, onClick, ...props }: Props) => {
  return (
    <FixedFab color="primary" onClick={onClick} {...props}>
      {children}
    </FixedFab>
  );
};

const FixedFab = styled(Fab)(() => ({
  position: 'fixed',
  bottom: '10px',
  right: '10px',
}));

export default BasicFab;
