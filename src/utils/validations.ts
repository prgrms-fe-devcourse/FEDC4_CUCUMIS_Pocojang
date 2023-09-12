const email = (email: string): string => {
  if (!email) return '이메일을 입력해주세요';
  if (email.length > 20) return '이메일은 20자 미만 입력 가능합니다.';
  if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}'/.test(email))
    return '올바른 이메일 형식이 아닙니다';
  return '';
};

const password = (password: string): string => {
  if (!password) return '비밀번호를 입력해주세요';
  if (password.length < 8 || password.length > 16)
    return '비밀번호는 8~16자만 입력 가능합니다.';
  if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password))
    return '비밀번호는 영문, 숫자, 특수문자를 조합하여 만들어주세요.';
  return '';
};

const passwordConfirm = (
  password: string,
  passwordConfirm: string,
): string | undefined => {
  if (!passwordConfirm) return '비밀번호 확인을 입력해주세요';
  if (password !== passwordConfirm) return '입력한 비밀번호와 다릅니다.';

  return '';
};

const name = (name: string): string => {
  if (!name) return '이름을 입력해주세요';
  if (name.length > 10) return '이름은 10자 미만 입력 가능합니다';

  return '';
};

const validation = {
  email,
  password,
  passwordConfirm,
  name,
};

export default validation;
