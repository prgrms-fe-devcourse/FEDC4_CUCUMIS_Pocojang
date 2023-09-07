import Stack from '@mui/material/Stack';

interface ChipGroupProps {
  children: React.ReactNode;
}

const ChipGroup = ({ children, ...props }: ChipGroupProps) => {
  return (
    <Stack direction="row" spacing={1} {...props}>
      {children}
    </Stack>
  );
};

export default ChipGroup;
