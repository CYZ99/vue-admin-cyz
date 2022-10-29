import axios from 'axios'
import { toast } from './componsable/utils'
import { getToken } from './componsable/auth'
// 创建一个axios的实例
const service = axios.create({
  baseURL: '/api',
  timeout: 4000,
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前设置 header token
  const token = getToken()
  if (token) {
    config.headers["token"] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应成功返回 data
  return response.data.data;
}, function (error) {
  // 对响应错误做点什么
  toast(error.message || "请求失败", 'error')
  return Promise.reject(error);
});

export default service