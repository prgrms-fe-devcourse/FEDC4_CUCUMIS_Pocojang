import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

import useInput from '@/hooks/components/useInput';
import BasicInputProps from '@/types/components/BasicInputProps';

const BasicSearch = ({ inputRef }: Partial<BasicInputProps<string>>) => {
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
  borderRadius: '24px',
  overflow: 'hidden',
  '& .MuiInputBase-root': {
    height: '48px',
  },
  '& .MuiInputBase-input': {
    paddingRight: '20px',
    paddingLeft: '20px',
  },
});

export default BasicSearch;
