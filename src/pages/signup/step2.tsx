import { useNavigate } from 'react-router-dom';

import useForm, { FormErrors, FormValues } from '@/hooks/components/useForm';
import BasicInput from '@/components/shared/input';
import SignupInputContainer from '@/components/signup/signupInputContainer';

const initialValues = {
  oneLiner: '',
  technicalTools: '',
  position: '',
  details: '',
};

const validate = ({
  oneLiner,
  technicalTools,
  position,
  details,
}: FormValues): FormErrors => {
  const newErrors: FormErrors = {};
  if (!oneLiner) newErrors.oneLiner = 'please enter oneLiner';
  if (!technicalTools) newErrors.technicalTools = 'please enter technicalTools';
  if (!position) newErrors.position = 'please enter position';
  if (!details) newErrors.details = 'please enter details';
  return newErrors;
};

export default function ExtraInformationPage() {
  const navigate = useNavigate();
  const onSubmit = async (value: FormValues) => {
    console.log(value);
    navigate('/home');
  };

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <SignupInputContainer
      buttonText="건너뛰고 회원가입"
      onSubmit={handleSubmit}
    >
      <BasicInput
        label="One Liner"
        placeholder="한 줄 포부를 작성해주세요"
        onChange={handleChange}
        errorMessage={errors.oneLiner}
        isRequired
      />
      <BasicInput
        label="Technical Tools"
        placeholder="기술 스택을 추가해주세요"
        onChange={handleChange}
        errorMessage={errors.technicalTools}
        isRequired
      />
      <BasicInput
        label="Position"
        placeholder="직군을 입력해주세요"
        onChange={handleChange}
        errorMessage={errors.position}
        isRequired
      />
      <BasicInput
        label="Details"
        placeholder="소개글을 작성해주세요"
        onChange={handleChange}
        errorMessage={errors.details}
        isRequired
      />
    </SignupInputContainer>
  );
}
