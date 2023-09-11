import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const BasicButton = ({
  variant = 'contained',
  color = 'primary',
  children,
  ...props
}: Props) => {
  return (
    <Button fullWidth color={color} variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default BasicButton;
