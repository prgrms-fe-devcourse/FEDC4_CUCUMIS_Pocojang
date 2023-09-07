import Fab, { FabProps } from '@mui/material/Fab';

interface BasicFabProps extends FabProps {
  children: React.ReactNode;
  onClick: () => void;
}
const BasicFab = ({ children, onClick, ...props }: BasicFabProps) => {
  return (
    <Fab color="primary" onClick={onClick} {...props}>
      {children}
    </Fab>
  );
};
export default BasicFab;
