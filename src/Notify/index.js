import Notify from './Notify.vue'
import { showNotify, hideNotify } from '../apis/Notify'

Notify.install = function(Vue) {
  Vue.component(Notify.name, Notify)

  // 添加api
  Vue.prototype.$showNotify = showNotify
  Vue.prototype.$hideNotify = hideNotify
}

export default Notify
