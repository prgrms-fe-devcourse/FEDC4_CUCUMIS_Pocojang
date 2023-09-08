import { useState } from 'react';
import TextField from '@mui/material/TextField';

interface BasicInputProps {
  type?: string; // 기본 search(x버튼 존재), password, number(연차)
  label: string; // input의 제목
  isRequired?: boolean; // 기본 true
  defaultValue?: string;
  regExp?: string; // 각 필드별 정규식 패턴
  errorMessage?: string;
  // value: Record<string, string>;
  setValue?: React.Dispatch<React.SetStateAction<object>>;
}

const BasicInput = ({
  type = 'search',
  label,
  isRequired = true,
  defaultValue,
  regExp,
  errorMessage,
  setValue,
}: BasicInputProps) => {
  const [isError, setIsError] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setValue &&
      setValue((prev: object) => ({
        ...prev,
        [name]: value,
      }));

    if (regExp) {
      setIsError(!new RegExp(regExp).test(value));
    }
  };

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
    />
  );
};

export default BasicInput;
