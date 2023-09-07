import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '@/consts/api';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestOptions = {
  data?: unknown;
  params?: unknown;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // TODO: localStorage 에서 token 가져오기
  // const token = localStorage.getItem(AUTH);
  const token = undefined;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

const request = async <Response>(
  url: string,
  method: Method,
  opt?: RequestOptions,
): Promise<AxiosResponse<{ data: Response }>> =>
  axiosInstance({
    method: 'POST',
    data: {
      url,
      method,
      params: opt?.params,
      data: opt?.data,
    } as AxiosRequestConfig,
  });

const get = async <Request, Response>(url: string, params?: Request) =>
  request<Response>(url, 'GET', { params });

const post = async <Request, Response>(url: string, data?: Request) =>
  request<Response>(url, 'POST', { data });

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
