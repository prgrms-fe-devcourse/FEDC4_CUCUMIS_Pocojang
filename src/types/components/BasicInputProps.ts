import { TextFieldProps } from '@mui/material';

interface ExtraInputProps {
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
}

type InputProps = ExtraInputProps & TextFieldProps;

export default InputProps;
