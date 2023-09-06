import Chip from '@mui/material/Chip';

interface BasicChipProps {
  label: string;
}
const BasicChip = ({ label, ...props }: BasicChipProps) => {
  return <Chip label={label} {...props} />;
};

export default BasicChip;
