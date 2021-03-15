import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Toast from './Toast.vue'
import { showToast, showLoading, hideLoading, hideToast } from '@/apis/Toast'

const _Toast: SFCWithInstall<typeof Toast> = Object.assign(Toast, {
  install: function(app: App) {
    app.component(Toast.name, Toast)

    const properties = app.config.globalProperties

    properties.$showToast = showToast
    properties.$hideToast = hideToast
    properties.$showLoading = showLoading
    properties.$hideLoading = hideLoading
  },
  showToast,
  hideToast,
  showLoading,
  hideLoading
})

export default _Toast
