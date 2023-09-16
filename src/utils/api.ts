import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '@/consts/api';
import SESSION_STORAGE from '@/consts/sessionStorage';
import session from '@/utils/sessionStorage';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestOptions = {
  headers?: AxiosHeaders;
  data?: unknown;
  params?: unknown;
};

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

const request = async <Response>(
  url: string,
  method: Method,
  opt?: RequestOptions,
): Promise<Response> =>
  axiosInstance({
    method: 'POST',
    headers: opt?.headers,
    data: {
      url,
      method,
      params: opt?.params,
      data: opt?.data,
    } as AxiosRequestConfig,
  }).then((result: AxiosResponse) => {
    return result.data;
  });

const get = async <Request, Response>(url: string, params?: Request) =>
  request<Response>(url, 'GET', { params });

const post = async <Request, Response>(
  url: string,
  data?: Request,
  isFormData = false,
) => {
  if (isFormData) {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return request<Response>(url, 'POST', { headers, data });
  }

  return request<Response>(url, 'POST', { data });
};

const put = async <Request, Response>(url: string, data?: Request) =>
  request<Response>(url, 'PUT', { data });

const del = async <Request, Response>(url: string, data?: Request) =>
  request<Response>(url, 'DELETE', { data });

const api = {
  get,
  post,
  put,
  del,
};

export default api;
