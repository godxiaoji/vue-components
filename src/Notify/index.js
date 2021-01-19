import Notify from './Notify.vue'
import { showNotify, hideNotify } from '../apis/Notify'

Notify.install = function(app) {
  app.component(Notify.name, Notify)

  const properties = app.config.globalProperties

  // 添加api
  properties.$showNotify = showNotify
  properties.$hideNotify = hideNotify
}

Notify.showNotify = showNotify
Notify.hideNotify = hideNotify

export default Notify
