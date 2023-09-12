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
