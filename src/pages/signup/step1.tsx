import { useNavigate } from 'react-router-dom';

import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';
import SignupInputContainer from '@/components/signup/signupInputContainer';
import BasicInput from '@/components/shared/input';
import validation from '@/utils/validations';

const initialValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
};

const validate = ({ email, password, passwordConfirm, name }: FormValues) => {
  const newErrors: FormErrors = {};

  const emailErrorMessage = validation.email(email);
  const passwordErrorMessage = validation.email(password);
  const passwordConfirmErrorMessage = validation.email(passwordConfirm);
  const nameErrorMessage = validation.email(name);

  if (emailErrorMessage) newErrors.email = emailErrorMessage;
  if (passwordErrorMessage) newErrors.password = passwordErrorMessage;
  if (passwordConfirmErrorMessage)
    newErrors.passwordConfirm = passwordConfirmErrorMessage;
  if (nameErrorMessage) newErrors.name = nameErrorMessage;

  return newErrors;
};

export default function SignupPage() {
  const navigate = useNavigate();
  const onSubmit = async (value: FormValues) => {
    // TODO: signup store 에 value 저장
    console.log(value);

    navigate('/signup/step2');
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <SignupInputContainer buttonText="다음" onSubmit={handleSubmit}>
      <BasicInput
        label="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleChange}
        errorMessage={errors.email}
        isRequired
      />
      <BasicInput
        type="password"
        label="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
        errorMessage={errors.password}
        isRequired
      />
      <BasicInput
        label="password confirm"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleChange}
        errorMessage={errors.passwordConfig}
        isRequired
      />
      <BasicInput
        label="name"
        placeholder="이름을 입력해주세요"
        onChange={handleChange}
        errorMessage={errors.name}
        isRequired
      />
    </SignupInputContainer>
  );
}
