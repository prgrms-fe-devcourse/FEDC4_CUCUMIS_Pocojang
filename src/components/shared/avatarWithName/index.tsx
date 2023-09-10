import Stack from '@mui/material/Stack';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import BasicAvatarProps from '@/types/components/BasicAvatarProps';

interface Props extends BasicAvatarProps {
  label: string;
}

const AvatarWithName = ({
  label,
  size = 60,
  imgSrc,
  alt,
  isUserOn = false,
  onClick,
}: Props) => {
  return (
    <Stack width={size} spacing={0.5}>
      <BasicAvatar
        size={size}
        imgSrc={imgSrc}
        alt={alt}
        isUserOn={isUserOn}
        onClick={onClick}
      />
      <BasicChip label={label} size="small" />
    </Stack>
  );
};

export default AvatarWithName;
