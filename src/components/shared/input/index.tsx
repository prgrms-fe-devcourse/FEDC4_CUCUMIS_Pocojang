import TextField from '@mui/material/TextField';

import useInput from '@/hooks/components/useInput';
import BasicInputProps from '@/types/components/BasicInputProps';

const BasicInput = ({
  type = 'search',
  label,
  isRequired = true,
  defaultValue,
  regExp,
  errorMessage,
  inputRef,
}: BasicInputProps<object>) => {
  const { isError, handleInput } = useInput({ inputRef, regExp });

  return (
    <TextField
      onChange={handleInput}
      required={isRequired}
      name={label}
      label={label}
      defaultValue={defaultValue}
      type={type}
      error={isError}
      helperText={isError ? errorMessage : ''}
      multiline={type === 'multiline'}
      fullWidth
    />
  );
};

export default BasicInput;
