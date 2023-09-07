import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { API_END_POINT } = process.env;

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const auth = request.headers.authorization;
  const axiosConfig: AxiosRequestConfig = request.body;

  const { status, data }: AxiosResponse = await axiosInstance({
    ...axiosConfig,
    headers: { Authorization: auth },
  });

  response.status(status).json(data);
}
