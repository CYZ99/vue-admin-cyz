import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
// 创建一个axios的实例
const service = axios.create({
  baseURL: '/api',
  timeout: 4000,
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前设置 header token
  const cookie = useCookies()
  const token = cookie.get("admin-token");
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
  ElMessage({
    showClose: true,
    message: error.message || "请求失败",
    type: 'error',
    duration: 1500
  })
  return Promise.reject(error);
});

export default service