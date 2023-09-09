import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Badge, { BadgeOrigin } from '@mui/material/Badge';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

import LOGO_IMG_SRC from '@/assets/react.svg';

interface Props extends AvatarProps {
  imgSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  isUserOn?: boolean;
}

const BasicAvatar = ({
  imgSrc = LOGO_IMG_SRC,
  alt = 'user profile',
  width = 32,
  height = 32,
  isUserOn = false,
  onClick,
}: Props) => {
  return (
    <BadgeStyled
      overlap="circular"
      anchorOrigin={anchorOriginStyle}
      variant={isUserOn ? 'dot' : 'standard'}
      onClick={onClick}
    >
      <AvatarStyled alt={alt} src={imgSrc} width={width} height={height} />
    </BadgeStyled>
  );
};

const AvatarStyled = styled(Avatar)<{ width: number; height: number }>(
  ({ width, height }) => ({
    width: `${width}px`,
    height: `${height}px`,
  }),
);

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
