import { Avatar } from '@mui/material';

interface BgProfileType {
  src: string;
  variant: 'square' | 'rounded';
  sx: {
    width: string | number;
    height: string | number;
  };
}
const BgProfile = ({ src, variant, sx }: BgProfileType) => {
  return <Avatar src={src} variant={variant} sx={sx} />;
};

export default BgProfile;
