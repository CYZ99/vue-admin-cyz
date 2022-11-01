import axios from '../axios'

// 统计面板的数据
export function getStatistics() {
  return axios.get("/admin/statistics1")
}

export function getStatistics2() {
  return axios.get("/admin/statistics2")
}

export function getStatistics3(type) {
  return axios.get("/admin/statistics3?type="+type)
}