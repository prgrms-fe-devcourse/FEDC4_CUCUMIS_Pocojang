import { useState, MutableRefObject } from 'react';

interface Props {
  inputRef: MutableRefObject<object>;
  regExp?: string;
}

const useInput = ({ inputRef, regExp }: Props) => {
  const [isError, setIsError] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (regExp) {
      setIsError(!new RegExp(regExp).test(value));
    }

    inputRef.current = { ...inputRef.current, [name]: value };
  };

  return { isError, handleInput };
};

export default useInput;
