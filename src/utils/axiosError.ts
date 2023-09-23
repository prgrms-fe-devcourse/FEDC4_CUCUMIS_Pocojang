import { AxiosError } from 'axios';

const handleAxiosError = (error: Error) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 502) {
      return '존재하지 않는 포스트입니다';
    } else {
      return '새로고침 해주세요';
    }
  }
  return '알 수 없는 오류 발생! 다시 접속해주세요';
};

export default handleAxiosError;
