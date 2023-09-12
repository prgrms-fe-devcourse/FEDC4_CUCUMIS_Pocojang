import TextField from '@mui/material/TextField';

import BasicInputProps from '@/types/components/BasicInputProps';

const BasicInput = ({
  isRequired = true,
  errorMessage,
  label,
  ...props
}: BasicInputProps) => {
  const { type = 'search' } = props;

  return (
    <TextField
      type={type}
      {...props}
      required={isRequired}
      name={label}
      label={label}
      helperText={errorMessage}
      error={errorMessage ? true : false}
      multiline={type === 'multiline'}
      fullWidth
    />
  );
};

export default BasicInput;
