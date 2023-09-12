import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

import BasicInputProps from '@/types/components/BasicInputProps';

const BasicSearch = ({ ...props }: Partial<BasicInputProps>) => {
  return (
    <SearchTextFieldStyled
      {...props}
      type="search"
      variant="filled"
      hiddenLabel
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
