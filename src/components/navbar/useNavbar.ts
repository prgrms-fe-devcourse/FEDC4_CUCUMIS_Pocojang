import { SyntheticEvent, useState } from 'react';

const useNavbar = ({ initialValue }) => {
  // TODO: layout store에서 location 가져오기
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
  };
};

export default useNavbar;
