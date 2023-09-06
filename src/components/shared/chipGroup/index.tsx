import Stack from '@mui/material/Stack';

import BasicChip from '@/components/shared/chip';

interface ChipGroupProps {
  labels: string[];
}

const ChipGroup = ({ labels }: ChipGroupProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {labels?.map((label: string, i) => (
        <BasicChip label={label} key={label + i} />
      ))}
    </Stack>
  );
};

export default ChipGroup;
