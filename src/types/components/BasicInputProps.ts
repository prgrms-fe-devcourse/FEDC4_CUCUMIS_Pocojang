import { MutableRefObject } from 'react';

export interface BasicInputProps {
  type?: string;
  label: string;
  isRequired?: boolean;
  defaultValue?: string;
  regExp?: string;
  errorMessage?: string;
  inputRef: MutableRefObject<object>;
}
