import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
  children: React.ReactNode;
  name: string;
  onClick: () => void;
}

const BasicButton = ({
  variant = 'contained',
  name,
  onClick,
  children,
  ...props
}: Props) => {
  return (
    <Button
      fullWidth
      variant={variant}
      name={name}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
export default BasicButton;
