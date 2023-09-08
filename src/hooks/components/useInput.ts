import { useState } from 'react';

import { BasicInputProps } from '@/types/components/BasicInputProps';

const useInput = ({ inputRef, regExp }: Partial<BasicInputProps>) => {
  const [isError, setIsError] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (regExp) {
      setIsError(!new RegExp(regExp).test(value));
    }

    if (inputRef) {
      inputRef.current = { ...inputRef.current, [name]: value };
    }
  };

  return { isError, handleInput };
};

export default useInput;
