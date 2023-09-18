import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '@/consts/api';
import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = session.getItem(SESSION_STORAGE.TOKEN);

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

const getCustomHeaders = (url: string, method: string): AxiosHeaders => {
  const headers = new AxiosHeaders();
  headers.set('api-method', method);
  headers.set('api-url', url);

  return headers;
};

const request = async <Request, Response>(
  config: AxiosRequestConfig<Request>,
): Promise<Response> =>
  axiosInstance({
    method: 'POST',
    ...config,
  }).then((result: AxiosResponse) => {
    return result.data;
  });

const get = async <Request, Response>(url: string, params?: Request) => {
  const headers = getCustomHeaders(url, METHOD.GET);

  return request<Request, Response>({ headers, params });
};

const post = async <Request, Response>(url: string, data?: Request) => {
  const headers = getCustomHeaders(url, METHOD.POST);

  return request<Request, Response>({ headers, data });
};

const put = async <Request, Response>(url: string, data?: Request) => {
  const headers = getCustomHeaders(url, METHOD.PUT);

  return request<Request, Response>({ headers, data });
};

const del = async <Request, Response>(url: string, data?: Request) => {
  const headers = getCustomHeaders(url, METHOD.DELETE);

  return request<Request, Response>({ headers, data });
};

const api = {
  get,
  post,
  put,
  del,
};

export default api;
