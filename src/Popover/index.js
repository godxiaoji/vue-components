import Popover from './Popover.vue'
import { showPopover } from '../apis/Popup'

Popover.install = function(Vue) {
  Vue.component(Popover.name, Popover)

  // 添加api
  Vue.prototype.$showPopover = showPopover
}

export default Popover
