import { AvatarProps } from '@mui/material/Avatar';

export default interface BasicAvatarProps extends AvatarProps {
  imgSrc?: string;
  alt?: string;
  size?: number;
  isUserOn?: boolean;
}
