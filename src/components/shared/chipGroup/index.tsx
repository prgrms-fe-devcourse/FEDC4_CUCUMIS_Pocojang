import Stack from '@mui/material/Stack';

import BasicChip from '@/components/shared/chip';

interface ChipGroupProps {
  labels: string[];
}

const ChipGroup = ({ labels, ...props }: ChipGroupProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {labels?.map((label: string, i) => (
        <BasicChip label={label} key={label + i} {...props} />
      ))}
    </Stack>
  );
};

export default ChipGroup;
