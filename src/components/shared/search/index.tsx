import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

import useInput from '@/hooks/components/useInput';
import { BasicInputProps } from '@/types/components/BasicInputProps';

const BasicSearch = ({ inputRef }: Partial<BasicInputProps>) => {
  const { handleInput } = useInput({ inputRef });

  return (
    <SearchTextFieldStyled
      type="search"
      variant="filled"
      hiddenLabel
      onChange={handleInput}
      required
      name="search"
      placeholder="검색어를 입력해주세요"
      fullWidth
    />
  );
};

const SearchTextFieldStyled = styled(TextField)({
  borderRadius: '20px;',
  overflow: 'hidden',
});

export default BasicSearch;
