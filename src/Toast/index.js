import Toast from './Toast.vue'
import { showToast, showLoading, hideLoading, hideToast } from '../apis/Toast'

Toast.install = function(app) {
  app.component(Toast.name, Toast)

  const properties = app.config.globalProperties

  // 添加api
  properties.$showToast = showToast
  properties.$hideToast = hideToast
  properties.$showLoading = showLoading
  properties.$hideLoading = hideLoading
}

Toast.showToast = showToast
Toast.hideToast = hideToast
Toast.showLoading = showLoading
Toast.hideLoading = hideLoading

export default Toast
