import { MutableRefObject } from 'react';

export interface BasicInputProps<T> {
  type?: string;
  label: string;
  isRequired?: boolean;
  defaultValue?: string;
  regExp?: string;
  errorMessage?: string;
  inputRef: MutableRefObject<T>;
}
