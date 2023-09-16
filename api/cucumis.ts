import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { API_END_POINT } = process.env;

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const { headers } = request;
  const auth = headers.authorization;
  const contentType = headers['content-type'];

  const axiosConfig: AxiosRequestConfig = request.body;

  const { status, data } = await axiosInstance({
    ...axiosConfig,
    headers: { Authorization: auth, 'Content-Type': contentType },
  })
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
