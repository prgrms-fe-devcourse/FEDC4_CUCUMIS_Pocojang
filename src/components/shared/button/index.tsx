import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const BasicButton = ({ variant = 'contained', children, ...props }: Props) => {
  return (
    <Button fullWidth variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default BasicButton;
