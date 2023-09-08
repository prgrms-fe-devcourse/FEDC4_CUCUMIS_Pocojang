import { useState, MutableRefObject } from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

export interface BasicInputProps {
  type?: string; // 기본 search(x버튼 존재), password, number(연차)
  label: string; // input의 제목
  isRequired?: boolean; // 기본 true
  defaultValue?: string;
  regExp?: string; // 각 필드별 정규식 패턴
  errorMessage?: string;
  inputRef: MutableRefObject<object>;
}
// textfield : multiline, searchbar

const BasicInput = ({
  type = 'search',
  label,
  isRequired = true,
  defaultValue,
  regExp,
  errorMessage,
  inputRef,
}: BasicInputProps) => {
  const [isError, setIsError] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (regExp) {
      setIsError(!new RegExp(regExp).test(value));
    }

    inputRef.current = { ...inputRef.current, [name]: value };
  };

  return (
    <>
      {label === 'search' ? (
        <SearchTextFieldStyled
          type="search"
          variant="filled"
          hiddenLabel
          onChange={handleInput}
          required={isRequired}
          name={label}
          placeholder="검색어를 입력해주세요"
          fullWidth
        />
      ) : (
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
      )}
    </>
  );
};

const SearchTextFieldStyled = styled(TextField)({
  borderRadius: '20px;',
  overflow: 'hidden',
});

export default BasicInput;
