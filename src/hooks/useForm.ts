import { useState, FormEvent } from 'react';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

interface FormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void> | void;
  validate: (values: FormValues) => FormErrors;
}

const useForm = ({ initialValues, onSubmit, validate }: FormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const isValidValue = () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isValidValue()) {
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
