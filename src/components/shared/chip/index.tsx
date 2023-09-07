import Chip, { ChipProps } from '@mui/material/Chip';

interface BasicChipProps extends ChipProps {
  label: string;
}
const BasicChip = ({ label, ...props }: BasicChipProps) => {
  return <Chip label={label} {...props} />;
};

export default BasicChip;
