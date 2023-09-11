import Stack from '@mui/material/Stack';

import BasicAvatar from '@/components/shared/avatar';
import BasicChip from '@/components/shared/chip';
import BasicAvatarProps from '@/types/components/BasicAvatarProps';

interface Props {
  AvatarProps?: BasicAvatarProps;
  size?: number;
  label: string;
}

const AvatarWithChip = ({ AvatarProps, size = 60, label }: Props) => {
  return (
    <Stack width={size} spacing={0.5}>
      <BasicAvatar {...AvatarProps} />
      <BasicChip label={label} size="small" />
    </Stack>
  );
};

export default AvatarWithChip;
