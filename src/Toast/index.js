import Toast from './Toast.vue'
import { showToast, showLoading, hideLoading, hideToast } from '../apis/Toast'

Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast)

  // 添加api
  Vue.prototype.$showToast = showToast
  Vue.prototype.$hideToast = hideToast
  Vue.prototype.$showLoading = showLoading
  Vue.prototype.$hideLoading = hideLoading
}

Toast.showToast = showToast
Toast.hideToast = hideToast
Toast.showLoading = showLoading
Toast.hideLoading = hideLoading

export default Toast
