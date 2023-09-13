import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Badge, { BadgeOrigin } from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';

import LOGO_IMG_SRC from '/Logo96.svg';

const BasicAvatar = ({
  imgSrc = LOGO_IMG_SRC,
  alt = 'user profile',
  size = 60,
  isUserOn = false,
  onClick,
}: BasicAvatarProps) => {
  return (
    <BadgeStyled
      overlap="circular"
      anchorOrigin={anchorOriginStyle}
      variant={isUserOn ? 'dot' : 'standard'}
      onClick={onClick}
    >
      <AvatarStyled alt={alt} src={imgSrc} size={size} />
    </BadgeStyled>
  );
};

const AvatarStyled = styled(Avatar)<{ size: number }>(({ size }) => ({
  width: `${size}px`,
  height: `${size}px`,
}));

const anchorOriginStyle: BadgeOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const ripple = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
} 
100% {
  transform: scale(2.4);
  opacity: 0;
}
`;

const BadgeStyled = styled(Badge)({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px gray`,
    zIndex: 0,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: `${ripple} 1.2s infinite ease-in-out`,
      border: '1px solid currentColor',
      content: '""',
      vertical: 'bottom',
      horizontal: 'right',
    },
  },
});

export default BasicAvatar;
