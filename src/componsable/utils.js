import { ElMessageBox, ElNotification } from 'element-plus'
import nProgress from 'nprogress'
// 消息提示
export function toast(message, type = "success") {
  ElNotification({
    showClose: true,
    message,
    type,
    duration: 1500,
  })
}

// 确认框
export function showModel(content = "提示内容", type = "warning", title = "") {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type
    }
  )
}

// 全局进度条
// 显示全局进度条
export function showFullLoding() {
  nProgress.start()
}

export function hideFullLoding() {
  nProgress.done()
}