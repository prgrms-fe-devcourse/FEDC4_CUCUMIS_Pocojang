import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

interface Props extends IconButtonProps {
  children: React.ReactElement<SvgIconComponent>;
}

type SvgIconComponent = typeof SvgIcon;

const BasicIconButton = ({ children, color = 'primary', ...props }: Props) => {
  return (
    <IconButton color={color} {...props}>
      {children}
    </IconButton>
  );
};

export default BasicIconButton;
