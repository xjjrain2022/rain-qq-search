import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import Cancel from './cancelRequest';
// 创建axios 赋值给常量axiosInstance

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});

// 添加请求拦截器（Interceptors）
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 发送请求之前做点什么
  console.log('request: ', config);
  Cancel.removePending(config);
  return Cancel.addPending(config);
}, error => Promise.reject(error));

// 添加响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  // 可以在这里对响应数据做点什么
  return response.data ?? {};
}, error => {
  // 响应错误的回调
  console.log('请求异常', error);
  return Promise.reject(error);
});


export default axiosInstance
