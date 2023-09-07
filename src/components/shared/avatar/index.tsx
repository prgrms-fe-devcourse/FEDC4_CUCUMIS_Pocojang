import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

interface BasicAvatarProps extends AvatarProps {
  imgSrc: string;
  alt: string;
  width: number;
  height: number;
  isLogin: boolean;
}

const BasicAvatar = ({
  imgSrc,
  alt,
  width,
  height,
  isLogin,
  onClick,
}: BasicAvatarProps) => {
  return (
    <BadgeStyled
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant={isLogin ? 'dot' : 'standard'}
      onClick={onClick}
    >
      <AvatarStyled alt={alt} src={imgSrc} width={width} height={height} />
    </BadgeStyled>
  );
};

export default BasicAvatar;

const AvatarStyled = styled(Avatar)<{ width: number; height: number }>(
  ({ width, height }) => ({
    width: `${width}px`,
    height: `${height}px`,
  }),
);

const BadgeStyled = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
