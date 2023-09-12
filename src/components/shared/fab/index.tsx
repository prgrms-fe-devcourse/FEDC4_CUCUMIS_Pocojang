import Fab, { FabProps } from '@mui/material/Fab';

interface Props extends FabProps {
  children: React.ReactNode;
}

const BasicFab = ({ children, ...props }: Props) => {
  return (
    <Fab color="primary" {...props}>
      {children}
    </Fab>
  );
};

export default BasicFab;
