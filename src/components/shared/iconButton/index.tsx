import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface Props extends IconButtonProps {
  children: React.ReactNode;
}

const BasicIconButton = ({ children, color = 'primary', ...props }: Props) => {
  return (
    <IconButton color={color} {...props}>
      {children}
    </IconButton>
  );
};

export default BasicIconButton;
