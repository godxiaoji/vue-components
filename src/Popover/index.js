import Popover from './Popover.vue'
import { showPopover } from '../apis/Popup'

Popover.install = function(app) {
  app.component(Popover.name, Popover)

  // 添加api
  app.config.globalProperties.$showPopover = showPopover
}

Popover.showPopover = showPopover

export default Popover
