import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import multipart from 'parse-multipart-data';

const { API_END_POINT } = process.env;

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

const getParsedMultipart = (request: VercelRequest): FormData => {
  const boundary = request.headers['content-type']?.split('boundary=')[1] ?? '';
  const parts = multipart.parse(request.read(), boundary);

  const formData = new FormData();
  for (let i = 0; i < parts.length; i++) {
    const { name, data } = parts[i];
    const value =
      name === 'image'
        ? (new Blob([Buffer.from(data)]) as File)
        : data.toString('utf-8');

    formData.append(name ?? '', value);
  }

  console.log('formData', formData);

  return formData;
};

const getAxiosRequestConfig = (request: VercelRequest): AxiosRequestConfig => {
  const { headers } = request;

  const method = headers['api-method'] as string;
  const url = headers['api-url'] as string;
  const auth = headers.authorization;

  const body = headers['content-type']?.includes('multipart/form-data')
    ? getParsedMultipart(request)
    : request.body;
  const query = request.query;

  return {
    method,
    url,
    headers: { Authorization: auth },
    data: body,
    params: query,
  };
};

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const requestConfig = getAxiosRequestConfig(request);

  const { status, data } = await axiosInstance(requestConfig)
    .then((response: AxiosResponse) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
        };
      }

      return {
        status: 500,
        data: 'Internal Server Error',
      };
    });

  response.status(status).json(data);
}
